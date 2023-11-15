const puppeteer = require('puppeteer');
const { filterKomponente, futureXUrls } = require('./funktionen');
const { Mainboard } = require('./models.js');
// Daten ins Backend senden
const axios = require('axios');
const backendUrl = 'http://192.168.198.48:3000/api/scrapedata';



(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let listVonUrlArtikel = await futureXUrls("https://www.future-x.de/Hardware-Netzwerk/PC-Komponenten/Mainboards/?b2bListingView=listing&manufacturer=ec8fd545e76fc2268f21a3ec915f51bd|7822381ecae1a830e0d8c2e4a0698eed&p=", 1);
    let listProzessorArtikle = [];
    
    for(let i = 0; i < listVonUrlArtikel.length; i++){ 
        await page.goto(listVonUrlArtikel[i]);
        let artikelMainboard = new Mainboard();

        try{
            const containerFluid = await page.$('main > .container-main');
            const titleDiv = await containerFluid.$('.cms-element-product-name > h1');
            const priceDiv = await containerFluid.$('.product-detail-price-container > p');
            const liferungDiv = await containerFluid.$('.product-detail-delivery-information p');
            const detailsSelektor = await containerFluid.$$('div.product-detail-description-text:nth-child(1) .table > tbody:nth-child(1) tr');
            const imgSelektor = await containerFluid.$('.img-fluid.gallery-slider-image.magnifier-image.js-magnifier-image');

            artikelMainboard.shopID = 2;
            artikelMainboard.kategorie = 'Mainboard';
            artikelMainboard.bezeichnung = await titleDiv.evaluate(node => node.innerText);
            artikelMainboard.preis = await priceDiv.evaluate(node => node.innerText);
            artikelMainboard.deliveryDate = await liferungDiv.evaluate(node => node.innerText);
            artikelMainboard.produktlink = listVonUrlArtikel[i];
            artikelMainboard.marke = (await titleDiv.evaluate(node => node.innerText)).split(' ')[0];
            artikelMainboard.imgUrl = await imgSelektor.evaluate(node => node.getAttribute('src'));


            for(const element of detailsSelektor){
                const data = await page.evaluate(el => el.querySelector('td:nth-child(2)').textContent, element);
                const merkmal = await page.evaluate(el => el.querySelector('th:nth-child(1)').textContent, element);

                if(data || merkmal){
                    if(merkmal.trim() === 'Prozessorsockel'){
                        artikelMainboard.sockel = data;
                    }else if(merkmal.trim() === 'Chipsatz'){
                        artikelMainboard.chipsatz = data;
                    }else if(merkmal.trim() === 'Max. unterstützte Größe'){
                        artikelMainboard.maximalSpeicher = data;
                    }else if(merkmal.trim() === 'Unterstützte RAM-Technologie'){
                        artikelMainboard.unterstützterSpeichertyp = data;
                    }else if(merkmal.trim() === 'Formfaktor'){
                        artikelMainboard.formfaktor = data;
                    }
                }
            }
            //envoi des chaque produits dans le backend
            /*
            try {
                const response = await axios.post(backendUrl, artikelMainboard, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log('Données envoyées avec succès au backend.', response.data);
            } catch (error) {
                console.error('Erreur lors de l\'envoi des données au backend :', error);
            }
            */
            
            //console.log(artikelMainboard);
            listProzessorArtikle.push(artikelMainboard);
        }catch(error){
            console.error('Erreur de navigation :', error);
        }
    }
    console.log(listProzessorArtikle)

    await browser.close();
})();

