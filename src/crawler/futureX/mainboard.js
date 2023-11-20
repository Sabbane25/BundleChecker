const puppeteer = require('puppeteer');
const { extrahiereZahl, futureXUrls, extrahiereDatum } = require('./funktionen');
const { Mainboard } = require('./models.js');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let listVonUrlArtikel = await futureXUrls("https://www.future-x.de/Hardware-Netzwerk/PC-Komponenten/Mainboards/?b2bListingView=listing&p=", 1);
    let listeArtikel = [];
    
    for(let i = 0; i < listVonUrlArtikel.length; i++){ 
        await page.goto(listVonUrlArtikel[i]);
        let artikelMainboard = new Mainboard();

        try{
            const containerFluid = await page.$('main > .container-main');
            const titleDiv = await containerFluid.$('.cms-element-product-name > h1');
            const priceDiv = await page.$('head > meta:nth-child(17)');
            const liferungDiv = await containerFluid.$('.product-detail-delivery-information p');
            const detailsSelektor = await containerFluid.$$('div.product-detail-description-text:nth-child(1) .table > tbody:nth-child(1) tr');
            const imgSelektor = await containerFluid.$('.img-fluid.gallery-slider-image.magnifier-image.js-magnifier-image');
            const markeSelektor = await page.$('head > meta:nth-child(16)');

            artikelMainboard.shopID = 2;
            artikelMainboard.kategorie = 'Mainboard';
            artikelMainboard.bezeichnung = await titleDiv.evaluate(node => node.innerText);
            const preis = await priceDiv.evaluate(node => node.getAttribute('content'));
            artikelMainboard.preis = parseFloat(preis);
            artikelMainboard.deliveryDate = extrahiereDatum(await liferungDiv.evaluate(node => node.innerText));
            artikelMainboard.produktlink = listVonUrlArtikel[i];
            artikelMainboard.marke = await markeSelektor.evaluate(node => node.getAttribute('content'));
            artikelMainboard.imgUrl = await imgSelektor.evaluate(node => node.getAttribute('src'));


            for(const element of detailsSelektor){
                const data = await page.evaluate(el => el.querySelector('td:nth-child(2)').textContent, element);
                const merkmal = await page.evaluate(el => el.querySelector('th:nth-child(1)').textContent, element);

                if(data || merkmal){
                    if(merkmal.trim() === 'Prozessorsockel'){
                        artikelMainboard.sockel = data;
                    }else if(merkmal.trim() === 'Chipsatz'){
                        artikelMainboard.chipsatz = data;
                    }else if((merkmal.trim() === 'Max. unterstützte Größe') || ( merkmal.trim() === 'Installierte Größe')){
                        artikelMainboard.maximalSpeicher = extrahiereZahl(data);
                    }else if(merkmal.trim() === 'Unterstützte RAM-Technologie'){
                        artikelMainboard.unterstuetzterSpeichertyp = data;
                    }else if(merkmal.trim() === 'Formfaktor'){
                        artikelMainboard.formfaktor = data;
                    }else if(merkmal.trim() === 'RAM-Steckplätze'){
                        artikelMainboard.anzahlSpeichersockel = extrahiereZahl(data);
                    }
                }
            }
            if(artikelMainboard.chipsatz || artikelMainboard.sockel || artikelMainboard.anzahlSpeichersockel || maximalSpeicher){
                listeArtikel.push(artikelMainboard);
            }
        }catch(error){
            console.error('Erreur de navigation :', error);
        }
    }
    console.log(listeArtikel);
    console.log(listeArtikel.length, 'Produkte');

    // Daten ins Backend senden
    const axios = require('axios');
    const backendUrl = 'http://192.168.198.48:3000/api/scrapedata';

    const produktListe = { kategorie: 'Mainboard', value: listeArtikel };

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

