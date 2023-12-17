const argv = require('yargs').argv;
const apiConfig = {
    HOST: argv.host === 'local' ? '127.0.0.1' : '192.168.198.48',
};

const puppeteer = require('puppeteer');
const { konvertiereInInt, futureXUrls, futureXUrls2, gibVerfuegbarkeit, extrahiereDatum, isEmpty } = require('./funktionen.js');
const { Netzteil } = require('./models.js')

let listeArtikel = [];

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let listVonUrlArtikel = await futureXUrls("https://www.future-x.de/Hardware-Netzwerk/Stromversorgung/?b2bListingView=listing&p=", 5);
    //let listVonUrlArtikel = await futureXUrls2("https://www.future-x.de/Hardware-Netzwerk/Stromversorgung/?b2bListingView=listing&p=");
    
    //await page.waitForTimeout(5000);

    anzahlElement = 0;
    for(let i = 0; i < listVonUrlArtikel.length; i++){ 
        await page.goto(listVonUrlArtikel[i]);
        let artikel = new Netzteil();

        try{
            const containerFluid = await page.$('main > .container-main');
            const titleDiv = await containerFluid.$('.cms-element-product-name > h1');
            const priceDiv = await page.$('head > meta:nth-child(17)');
            const liferungDiv = await containerFluid.$('.product-detail-delivery-information p');
            const detailsSelektor = await containerFluid.$$('div.product-detail-description-text:nth-child(1) .table > tbody:nth-child(1) tr')
            const imgSelektor = await containerFluid.$('.img-fluid.gallery-slider-image.magnifier-image.js-magnifier-image');
            const markeSelektor = await page.$('head > meta:nth-child(16)');

            artikel.shopID = 2;
            artikel.kategorie = 'Netzteil';
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
                  if(merkmal === "Formfaktor"){
                    if(isEmpty(artikel.typ)){
                      artikel.formfaktor = data; 
                    }
                  }else if(merkmal === "Gestellte Leistung"){
                    artikel.leistung = konvertiereInInt(data,'Watt');
                  }else if(merkmal === "Netzteil-Formfaktor"){
                    artikel.bauForm = data;
                  }else if(merkmal === "80-PLUS-Zertifizierung"){
                    artikel.zertifizierung = data;
                  }
                }
            }
            anzahlElement++;
            console.log('Produkte: ',anzahlElement);
            //console.log(artikel)
            if(artikel.bauForm){
              console.log("------ Produkt hizugefügt ------");
              listeArtikel.push(artikel);
            }
            
        }catch(error){
            console.error('Erreur de navigation :', error);
        }
    }
    console.log(listeArtikel);
    console.log("total", listeArtikel.length);

    // Daten ins Backend senden
    const axios = require('axios');
    const backendUrl = `http://${apiConfig.URL}/api/scrapedata`;

    const produktListe = { kategorie: 'Netzteil', value: listeArtikel };

    try {
        const response = await axios.post(backendUrl, produktListe, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Données envoyées avec succès au backend.', response.data);
    } catch (error) {
        console.error('Erreur lors de l\'envoi des données au backend :', error);
    }

    await browser.close();
})();
