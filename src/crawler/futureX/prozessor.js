const argv = require('yargs').argv;
const apiConfig = {
    HOST: argv.host === 'local' ? '127.0.0.1' : '192.168.198.48',
};
const axios = require('axios');
const backendUrl = `http://${apiConfig.HOST}:3000/api/scrapedata`;

const puppeteer = require('puppeteer');
const { konvertiereInInt, gibVerfuegbarkeit, futureXUrls2, extrahiereZahl, extrahiereDatum } = require('./funktionen.js');
const { Prozessor } = require('./models.js');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let listProzessorArtikle = [];

    let listVonUrlArtikel = await futureXUrls2("https://www.future-x.de/Hardware-Netzwerk/PC-Komponenten/CPUs/?b2bListingView=listing&p=");
    

    anzahlArtikel = 0;

    for(let i = 0; i < listVonUrlArtikel.length; i++){ 
        await page.goto(listVonUrlArtikel[i]);
        let artikel = new Prozessor();

        try{
            const containerFluid = await page.$('main > .container-main');
            const titleDiv = await containerFluid.$('.cms-element-product-name > h1');
            const priceDiv = await page.$('head > meta:nth-child(18)');
            const liferungDiv = await containerFluid.$('.product-detail-delivery-information p');
            const detailsSelektor = await containerFluid.$$('div.product-detail-description-text:nth-child(1) .table > tbody:nth-child(1) tr')
            const imgSelektor = await containerFluid.$('.img-fluid.gallery-slider-image.magnifier-image.js-magnifier-image');
            const markeSelektor = await page.$('head > meta:nth-child(17)');

            artikel.shopID = 2;
            artikel.kategorie = 'Prozessor';
            artikel.bezeichnung = await titleDiv.evaluate(node => node.innerText);
            artikel.marke = await markeSelektor.evaluate(node => node.getAttribute('content'));
            const preis = await priceDiv.evaluate(node => node.getAttribute('content'));
            artikel.preis = parseFloat(preis);
            artikel.deliveryDate = extrahiereDatum(await liferungDiv.evaluate(node => node.innerText));
            artikel.produktlink = listVonUrlArtikel[i];
            artikel.imgUrl = await imgSelektor.evaluate(node => node.getAttribute('src'));
            artikel.verfuegbarkeit = gibVerfuegbarkeit(await liferungDiv.evaluate(node => node.innerText));


            let hatInterneGrafik = false; 
            for(const element of detailsSelektor){
                const data = await page.evaluate(el => el.querySelector('td:nth-child(2)').textContent, element);
                const merkmal = await page.evaluate(el => el.querySelector('th:nth-child(1)').textContent, element);

                if(data || merkmal){
                    switch (merkmal.trim()) {
                        case "Anz. der Kerne":
                            if((data.trim()).includes('Quad-Core')){
                                artikel.kerne = 4;
                            }else{
                                artikel.kerne = extrahiereZahl(data);
                            }
                            break;

                        case "Taktfrequenz":
                            artikel.taktfrequenz = data;
                            break;
                    
                        case "Anz. der Threads":
                            artikel.threads = konvertiereInInt(data, 'Threads');
                            break;
                    
                        case "Geeignete Sockel":
                            artikel.sockel = data;
                            break;

                        case "Thermal Design Power (TDP)":
                            artikel.stromverbrauch = konvertiereInInt(data, 'W');
                            break; 

                        case "Max. Turbo-Taktfrequenz":
                            artikel.maxTurboTaktfrequenz = parseInt(parseFloat(data.replace(',', '.')) * 1000);
                            break;  
                        
                        case "Typ":
                            if(hatInterneGrafik){
                                if(typeof artikel.CPUTyp === "undefined"){
                                    artikel.CPUTyp = data;
                                }else if(typeof artikel.interneGrafik === 'undefined'){
                                    artikel.interneGrafik = data;
                                }
                            }
                            hatInterneGrafik = false;
                            break;  
                        
                        case "Prozessor":
                            hatInterneGrafik = true;
                            break; 
                        
                        case "Integrierte Grafik":
                            hatInterneGrafik = true;
                            break;     
                    
                        default:
                            break;
                    }
                }
            }
            if(typeof artikel.interneGrafik === 'undefined'){
                artikel.interneGrafik = "ohne CPU-Grafik"
            }

            if(artikel.maxTurboTaktfrequenz && artikel.threads && artikel.taktfrequenz
                && artikel.sockel && artikel.preis){
                    listProzessorArtikle.push(artikel);
                    console.log(artikel);
                    
                // sende gecrawlten Artikel in server
                 const produktListe = { kategorie: 'CPU', value: artikel };
                try {
                    const response = await axios.post(backendUrl, produktListe, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    });
                console.log('Daten erfolgreich an das Backend gesendet', response.data);
                } catch (error) {
                    console.error('Fehler beim Senden von Daten an das Backend (Angular):', error);
                }
            }
            
        }catch(error){
            console.error('Erreur de navigation :', error);
        }
    }
    console.log("Total: ", listProzessorArtikle.length);

    await browser.close();
})();
