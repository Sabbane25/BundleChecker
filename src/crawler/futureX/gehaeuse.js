const argv = require('yargs').argv;
const apiConfig = {
    HOST: argv.host === 'local' ? '127.0.0.1' : '192.168.198.48',
};

const puppeteer = require('puppeteer');
const { konvertiereInFloat, futureXUrls, extrahiereDatum, gibVerfuegbarkeit } = require('./funktionen');
const { Gehaeuse } = require('./models.js');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let listVonUrlArtikel = await futureXUrls("https://www.future-x.de/Hardware-Netzwerk/PC-Komponenten/PC-Gehaeuse/?b2bListingView=listing&p=", 1);
    let listeArtikel = [];

    for(let i = 0; i < listVonUrlArtikel.length; i++){ 
        await page.goto(listVonUrlArtikel[i]);
        let artikel = new Gehaeuse();

        try{
            const containerFluid = await page.$('main > .container-main');
            const titleDiv = await containerFluid.$('.cms-element-product-name > h1');
            const priceDiv = await page.$('head > meta:nth-child(17)');
            const liferungDiv = await containerFluid.$('.product-detail-delivery-information p');
            const detailsSelektor = await containerFluid.$$('div.product-detail-description-text:nth-child(1) .table tr');
            const imgSelektor = await containerFluid.$('.img-fluid.gallery-slider-image.magnifier-image.js-magnifier-image');
            const markeSelektor = await page.$('head > meta:nth-child(16)');

            artikel.shopID = 2;
            artikel.kategorie = 'Gehaeuse';
            artikel.bezeichnung = await titleDiv.evaluate(node => node.innerText);
            const preis = await priceDiv.evaluate(node => node.getAttribute('content'));
            artikel.preis = parseFloat(preis);
            artikel.deliveryDate = extrahiereDatum(await liferungDiv.evaluate(node => node.innerText));
            artikel.produktlink = listVonUrlArtikel[i];
            artikel.marke = await markeSelektor.evaluate(node => node.getAttribute('content'));
            artikel.imgUrl = await imgSelektor.evaluate(node => node.getAttribute('src'));
            artikel.verfuegbarkeit = gibVerfuegbarkeit(await liferungDiv.evaluate(node => node.innerText));

            for(const element of detailsSelektor){
                const data = await page.evaluate(el => el.querySelector('td:nth-child(2)').textContent, element);
                const merkmal = await page.evaluate(el => el.querySelector('th:nth-child(1)').textContent, element);

                if(data){
                    if(merkmal === "Anzahl von vorne zugänglicher Einbauschächte"){
                        artikel.frontanschluesse = data;
                    }else if(merkmal == "Gewicht"){
                         artikel.gewicht = konvertiereInFloat(data);
                    }else if(merkmal === "Unterstützte Motherboards"){
                        artikel.mainboardFormfaktor = data;
                    }else if(merkmal ==="Breite"){
                        artikel.breite = data;
                    }else if(merkmal === "Tiefe"){
                        artikel.tiefe = data;
                    }else if(merkmal === "Höhe"){
                        artikel.hoehe = data;
                    }else if(merkmal === "Hersteller-Formfaktor"){
                        artikel.produkttyp = data;
                    }
                }
            }
            if(typeof artikel.gewicht === 'undefined'){
                artikel.gewicht = 0;
            }
            if(typeof artikel.frontanschluesse === 'undefined'){
                artikel.frontanschluesse = 'nicht gegeben';
            }
            
            artikel.abmessung = artikel.breite + " " + artikel.hoehe + " " + artikel.tiefe;
            if(artikel.preis){
                listeArtikel.push(artikel);
            }
        }catch(error){
            console.error('Erreur de navigation :', error);
        }
    }
    console.log(listeArtikel)
    console.log('Total: ', listeArtikel.length);

    /*
    // Daten ins Backend senden
    const axios = require('axios');
    const backendUrl = `http://${apiConfig.URL}/api/scrapedata`;

    const produktListe = { kategorie: 'Gehäuse', value: listeArtikel };

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
