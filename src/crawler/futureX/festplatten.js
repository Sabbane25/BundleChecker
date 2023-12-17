const argv = require('yargs').argv;
const apiConfig = {
    HOST: argv.host === 'local' ? '127.0.0.1' : '192.168.198.48',
};

const puppeteer = require('puppeteer');
const { konvertiereInInt, futureXUrls, extrahiereFloat2, gibVerfuegbarkeit, extrahiereDatum, isEmpty } = require('./funktionen.js');
const { Festplatte } = require('./models.js');


(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let listeArtikel = [];
    let listVonUrlArtikel = await futureXUrls("https://www.future-x.de/Hardware-Netzwerk/PC-Komponenten/Festplatten/?b2bListingView=listing&order=topseller&p=", 1);
    
    //await page.waitForTimeout(5000);

    for(let i = 0; i < listVonUrlArtikel.length; i++){ 
        await page.goto(listVonUrlArtikel[i]);
        let artikel = new Festplatte();

        try{
            const containerFluid = await page.$('main > .container-main');
            const titleDiv = await containerFluid.$('.cms-element-product-name > h1');
            const priceDiv = await containerFluid.$('.product-detail-price-container > p');
            const liferungDiv = await containerFluid.$('.product-detail-delivery-information p');
            const detailsSelektor = await containerFluid.$$('div.product-detail-description-text:nth-child(1) .table > tbody:nth-child(1) tr')
            const imgSelektor = await containerFluid.$('.img-fluid.gallery-slider-image.magnifier-image.js-magnifier-image');
            const markeSelektor = await page.$('head > meta:nth-child(16)');

            artikel.shopID = 2;
            artikel.kategorie = 'Festplatte';
            artikel.bezeichnung = await titleDiv.evaluate(node => node.innerText);
            //artikel.marke = artikel.bezeichnung.split(" ")[0];
            artikel.preis = extrahiereFloat2(await priceDiv.evaluate(node => node.innerText));
            artikel.deliveryDate = extrahiereDatum(await liferungDiv.evaluate(node => node.innerText));
            artikel.produktlink = listVonUrlArtikel[i];
            artikel.imgUrl = await imgSelektor.evaluate(node => node.getAttribute('src'));
            artikel.marke = await markeSelektor.evaluate(node => node.getAttribute('content'));
            artikel.verfuegbarkeit = gibVerfuegbarkeit(await liferungDiv.evaluate(node => node.innerText));

            istExterne = false;
            for(const element of detailsSelektor){
                const data = await page.evaluate(el => el.querySelector('td:nth-child(2)').textContent, element);
                const merkmal = await page.evaluate(el => el.querySelector('th:nth-child(1)').textContent, element);

                if(data || merkmal){
                  if(merkmal === "Typ"){
                    if(isEmpty(artikel.typ)){
                      artikel.typ = data; 
                    }
                  }else if(merkmal === "Kapazität"){
                    artikel.kapazitaet = data;
                  }else if(merkmal === "Energieverbrauch"){ 
                    artikel.energieverbrauch = parseFloat(data.split(' ')[0]);
                  }else if(merkmal === "Interner Datendurchsatz"){  
                    artikel.lesen = konvertiereInInt(data, 'MBps');
                  }else if(merkmal === "Interne Datenrate (Schreiben)"){  
                    artikel.schreiben = konvertiereInInt(data, 'MBps');
                  }
                }
            }
            if(artikel.energieverbrauch && artikel.preis){
              listeArtikel.push(artikel);
            }
        }catch(error){
            console.error('Erreur de navigation :', error);
        }
    }
    console.log(listeArtikel);
    console.log("total", listeArtikel.length);

    /*
    // Daten ins Backend senden
    const axios = require('axios');
    const backendUrl = `http://${apiConfig.URL}/api/scrapedata`;

    const produktListe = { kategorie: 'Festplatte', value: listeArtikel };

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
    */

    await browser.close();
})();
