const puppeteer = require('puppeteer');
const { konvertiereInFloat, futureXUrls, extrahiereDatum } = require('./funktionen');
const { Gehaeuse } = require('./models.js');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let listVonUrlArtikel = await futureXUrls("https://www.future-x.de/Hardware-Netzwerk/PC-Komponenten/PC-Gehaeuse/?b2bListingView=listing&p=", 1);
    let listeArtikel = [];

    for(let i = 0; i < listVonUrlArtikel.length; i++){ 
        await page.goto(listVonUrlArtikel[i]);
        let artikelGehaeuse = new Gehaeuse();

        try{
            const containerFluid = await page.$('main > .container-main');
            const titleDiv = await containerFluid.$('.cms-element-product-name > h1');
            const priceDiv = await page.$('head > meta:nth-child(17)');
            const liferungDiv = await containerFluid.$('.product-detail-delivery-information p');
            const detailsSelektor = await containerFluid.$$('div.product-detail-description-text:nth-child(1) .table tr');
            const imgSelektor = await containerFluid.$('.img-fluid.gallery-slider-image.magnifier-image.js-magnifier-image');
            const markeSelektor = await page.$('head > meta:nth-child(16)');

            artikelGehaeuse.shopID = 2;
            artikelGehaeuse.kategorie = 'Gehaeuse';
            artikelGehaeuse.bezeichnung = await titleDiv.evaluate(node => node.innerText);
            const preis = await priceDiv.evaluate(node => node.getAttribute('content'));
            artikelGehaeuse.preis = parseFloat(preis);
            artikelGehaeuse.deliveryDate = extrahiereDatum(await liferungDiv.evaluate(node => node.innerText));
            artikelGehaeuse.produktlink = listVonUrlArtikel[i];
            artikelGehaeuse.marke = await markeSelektor.evaluate(node => node.getAttribute('content'));
            artikelGehaeuse.imgUrl = await imgSelektor.evaluate(node => node.getAttribute('src'));

            for(const element of detailsSelektor){
                const data = await page.evaluate(el => el.querySelector('td:nth-child(2)').textContent, element);
                const merkmal = await page.evaluate(el => el.querySelector('th:nth-child(1)').textContent, element);

                if(data){
                    if(merkmal === "Anzahl von vorne zugänglicher Einbauschächte"){
                        artikelGehaeuse.frontanschluesse = data;
                    }else if(merkmal == "Gewicht"){
                         artikelGehaeuse.gewicht = konvertiereInFloat(data);
                    }else if(merkmal === "Unterstützte Motherboards"){
                        artikelGehaeuse.mainboardFormfaktor = data;
                    }else if(merkmal ==="Breite"){
                        artikelGehaeuse.breite = data;
                    }else if(merkmal === "Tiefe"){
                        artikelGehaeuse.tiefe = data;
                    }else if(merkmal === "Höhe"){
                        artikelGehaeuse.hoehe = data;
                    }else if(merkmal === "Hersteller-Formfaktor"){
                        artikelGehaeuse.produkttyp = data;
                    }
                }
            }
            if(typeof artikelGehaeuse.gewicht === 'undefined'){
                artikelGehaeuse.gewicht = 0;
            }
            if(typeof artikelGehaeuse.frontanschluesse === 'undefined'){
                artikelGehaeuse.frontanschluesse = 'nicht gegeben';
            }
            
            artikelGehaeuse.abmessung = artikelGehaeuse.breite + " " + artikelGehaeuse.hoehe + " " + artikelGehaeuse.tiefe;
            if(artikelGehaeuse.breite){
                listeArtikel.push(artikelGehaeuse);
            }
        }catch(error){
            console.error('Erreur de navigation :', error);
        }
    }
    console.log(listeArtikel)
    console.log('Total: ', listeArtikel.length);

    // Daten ins Backend senden
    const axios = require('axios');
    const backendUrl = 'http://192.168.198.48:3000/api/scrapedata';

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

    await browser.close();
})();
