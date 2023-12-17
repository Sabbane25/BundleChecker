const argv = require('yargs').argv;
const apiConfig = {
    HOST: argv.host === 'local' ? '127.0.0.1' : '192.168.198.48',
};

const puppeteer = require('puppeteer');
const { konvertiereInInt, gibVerfuegbarkeit, futureXUrls, futureXUrls2, futureXUrls2, extrahiereFloat2, extrahiereZahl, extrahiereDatum } = require('./funktionen.js');
const { Prozessor } = require('./models.js');



(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    //let listeArtikel = await futureXUrls("https://www.future-x.de/Hardware-Netzwerk/PC-Komponenten/CPUs/?b2bListingView=listing&p=", 1);

    let listeArtikel = await futureXUrls2("https://www.future-x.de/Hardware-Netzwerk/PC-Komponenten/CPUs/?b2bListingView=listing&p=");
    

    anzahlArtikel = 0;
    for(let i = 0; i < listeArtikel.length; i++){ 
        await page.goto(listeArtikel[i]);
        let artikel = new Prozessor();

        try{
            const containerFluid = await page.$('main > .container-main');
            const titleDiv = await containerFluid.$('.cms-element-product-name > h1');
            const priceDiv = await containerFluid.$('.product-detail-price-container > p');
            const liferungDiv = await containerFluid.$('.product-detail-delivery-information p');
            const detailsSelektor = await containerFluid.$$('div.product-detail-description-text:nth-child(1) .table > tbody:nth-child(1) tr');
            const imgSelektor = await containerFluid.$('.img-fluid.gallery-slider-image.magnifier-image.js-magnifier-image');
            const markeSelektor = await page.$('head > meta:nth-child(16)');

            artikelProzessor.shopID = 2;
            artikelProzessor.kategorie = 'Prozessor';
            artikelProzessor.bezeichnung = await titleDiv.evaluate(node => node.innerText);
            artikelProzessor.marke = (await titleDiv.evaluate(node => node.innerText)).split(" ")[0];
            artikelProzessor.preis = extrahiereFloat2(await priceDiv.evaluate(node => node.innerText));
            artikelProzessor.deliveryDate = extrahiereDatum(await liferungDiv.evaluate(node => node.innerText));
            artikelProzessor.produktlink = listeArtikel[i];
            artikelProzessor.imgUrl = await imgSelektor.evaluate(node => node.getAttribute('src'));
            artikelProzessor.verfuegbarkeit = gibVerfuegbarkeit(await liferungDiv.evaluate(node => node.innerText));

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
                            artikel.maxTurboTaktfrequenz = extrahiereZahl(data);
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

            if(artikelProzessor.maxTurboTaktfrequenz && artikelProzessor.threads && artikelProzessor.taktfrequenz
                && artikelProzessor.sockel && artikelProzessor.preis){
                    console.log(artikelProzessor);
                    listProzessorArtikle.push(artikelProzessor);
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

    const produktListe = { kategorie: 'CPU', value: listProzessorArtikle };

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
