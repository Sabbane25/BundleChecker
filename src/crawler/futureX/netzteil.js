const puppeteer = require('puppeteer');
const { filterKomponente, futureXUrls, extrahiereFloat2, extrahiereZahl, extrahiereDatum, isEmpty } = require('./funktionen.js');
const { Netzteil } = require('./models.js')

let listeArtikel = [];

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let listVonUrlArtikel = await futureXUrls("https://www.future-x.de/PC-Notebook/Netzteile/?b2bListingView=listing&order=topseller&p=", 1);
    
    //await page.waitForTimeout(5000);

    for(let i = 0; i < listVonUrlArtikel.length; i++){ 
        await page.goto(listVonUrlArtikel[i]);
        let artikel = new Netzteil();

        try{
            const containerFluid = await page.$('main > .container-main');
            const titleDiv = await containerFluid.$('.cms-element-product-name > h1');
            const priceDiv = await containerFluid.$('.product-detail-price-container > p');
            const liferungDiv = await containerFluid.$('.product-detail-delivery-information p');
            const detailsSelektor = await containerFluid.$$('div.product-detail-description-text:nth-child(1) .table > tbody:nth-child(1) tr')

            artikel.shopID = 2;
            artikel.kategorie = 'Netzteil';
            artikel.bezeichnung = await titleDiv.evaluate(node => node.innerText);
            artikel.marke = artikel.bezeichnung.split(" ")[0];
            artikel.preis = extrahiereFloat2(await priceDiv.evaluate(node => node.innerText));
            artikel.deliveryDate = extrahiereDatum(await liferungDiv.evaluate(node => node.innerText));
            artikel.produktlink = listVonUrlArtikel[i];


            for(const element of detailsSelektor){
                const data = await page.evaluate(el => el.querySelector('td:nth-child(2)').textContent, element);
                const merkmal = await page.evaluate(el => el.querySelector('th:nth-child(1)').textContent, element);

                if(data || merkmal){
                  if(merkmal === "Formfaktor"){
                    if(isEmpty(artikel.typ)){
                      artikel.formfaktor = data; 
                    }
                  }else if(merkmal === "Gestellte Leistung"){
                    artikel.leistungskapazitaet = data;
                  }
                }
            }
            listeArtikel.push(artikel);
        }catch(error){
            console.error('Erreur de navigation :', error);
        }
    }
    console.log(listeArtikel);
    console.log("total", listeArtikel.length);

    /*
    // Daten ins Backend senden
    const axios = require('axios');
    const backendUrl = 'http://192.168.198.48:3000/api/scrapedata';

    try {
        const response = await axios.post(backendUrl, listeArtikel, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Données envoyées avec succès au backend.', response.data);
    } catch (error) {
        console.error('Erreur lors de l\'envoi des données au backend :', error);
    }
    */

    await browser.close();
})();