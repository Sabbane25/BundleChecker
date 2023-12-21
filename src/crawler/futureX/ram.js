const argv = require('yargs').argv;
const apiConfig = {
    HOST: argv.host === 'local' ? '127.0.0.1' : '192.168.198.48',
};
const axios = require('axios');
const backendUrl = `http://${apiConfig.HOST}:3000/api/scrapedata`;

const puppeteer = require('puppeteer');
const { futureXUrls, futureXUrls2, extrahiereFloat2, extrahiereDatum, konvertiereInInt, gibVerfuegbarkeit } = require('./funktionen.js');
const { Arbeitsspeicher } = require('./models.js');

let listeArtikel = [];
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let listVonUrlArtikel = await futureXUrls2("https://www.future-x.de/Hardware-Netzwerk/PC-Komponenten/Arbeitsspeicher/?b2bListingView=listing&p=");
    
    anzahlArtikel = 1;

    for(let i = 0; i < listVonUrlArtikel.length; i++){ 
      await page.goto(listVonUrlArtikel[i]);
      let artikel = new Arbeitsspeicher();

      try{
          const containerFluid = await page.$('main > .container-main');
          const titleDiv = await containerFluid.$('.cms-element-product-name > h1');
          const priceDiv = await page.$('head > meta:nth-child(18)');
          const liferungDiv = await containerFluid.$('.product-detail-delivery-information p');
          const detailsSelektor = await containerFluid.$$('div.product-detail-description-text:nth-child(1) .table > tbody:nth-child(1) tr');
          const imgSelektor = await containerFluid.$('.img-fluid.gallery-slider-image.magnifier-image.js-magnifier-image');
          const markeSelektor = await page.$('head > meta:nth-child(17)');

          artikel.shopID = 2;
          artikel.kategorie = 'RAM';
          artikel.bezeichnung = await titleDiv.evaluate(node => node.innerText);
          artikel.marke = await markeSelektor.evaluate(node => node.getAttribute('content'));
          const preis = await priceDiv.evaluate(node => node.getAttribute('content'));
          artikel.preis = parseFloat(preis);
          artikel.deliveryDate = extrahiereDatum(await liferungDiv.evaluate(node => node.innerText));
          artikel.produktlink = listVonUrlArtikel[i];
          artikel.imgUrl = await imgSelektor.evaluate(node => node.getAttribute('src'));
          artikel.verfuegbarkeit = gibVerfuegbarkeit(await liferungDiv.evaluate(node => node.innerText));

          for(const element of detailsSelektor){
            const data = await page.evaluate(el => el.querySelector('td:nth-child(2)').textContent, element);
            const merkmal = await page.evaluate(el => el.querySelector('th:nth-child(1)').textContent, element);

            if(data || merkmal){
              if(merkmal === "Technologie"){
                  artikel.typ = data; 
              }else if(merkmal === "Speicherkapazität"){
                artikel.kapazitaet = konvertiereInInt(data, 'GB');
              }else if(merkmal === "Versorgungsspannung"){
                artikel.spannung = extrahiereFloat2(data, 'V');
              }else if(merkmal === "CAS Latency"){
                artikel.latency = konvertiereInInt(data, 'CL');
              }
            }
          }
          if(artikel.typ && artikel.kapazitaet){
            console.log("Artikel hinzugefügt: ", anzahlArtikel++);
            listeArtikel.push(artikel);
            console.log(artikel);
            const produktListe = { kategorie: 'RAM', value: artikel };

            // sende gecrawlten Artikel in server
            /*
            try {
              const response = await axios.post(backendUrl, produktListe, {
                headers: {
                    'Content-Type': 'application/json',
                },
              });
            console.log('Daten erfolgreich an das Backend gesendet', response.data);
            } catch (error) {
              console.error('Fehler beim Senden von Daten an das Backend (Angular):', error);
            }*/
          }
      }catch(error){
        console.error('Erreur de navigation :', error);
      }
    }
    console.log(listeArtikel);
    console.log("total", listeArtikel.length);

    await browser.close();
})();
