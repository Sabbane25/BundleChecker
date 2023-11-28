const puppeteer = require('puppeteer');
const { konvertiereInInt, gibVerfuegbarkeit, futureXUrls, extrahiereFloat2, extrahiereZahl, extrahiereDatum } = require('./funktionen.js');
const { Prozessor } = require('./models.js')

let listProzessorArtikle = [];

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let listVonUrlArtikel = await futureXUrls("https://www.future-x.de/Hardware-Netzwerk/PC-Komponenten/CPUs/?b2bListingView=listing&p=", 4);
    
    //await page.waitForTimeout(5000);

    for(let i = 0; i < listVonUrlArtikel.length; i++){ 
        await page.goto(listVonUrlArtikel[i]);
        let artikelProzessor = new Prozessor();

        try{
            const containerFluid = await page.$('main > .container-main');
            const titleDiv = await containerFluid.$('.cms-element-product-name > h1');
            const priceDiv = await containerFluid.$('.product-detail-price-container > p');
            const liferungDiv = await containerFluid.$('.product-detail-delivery-information p');
            const detailsSelektor = await containerFluid.$$('div.product-detail-description-text:nth-child(1) .table > tbody:nth-child(1) tr');
            const imgSelektor = await containerFluid.$('.img-fluid.gallery-slider-image.magnifier-image.js-magnifier-image');

            artikelProzessor.shopID = 2;
            artikelProzessor.kategorie = 'Prozessor';
            artikelProzessor.bezeichnung = await titleDiv.evaluate(node => node.innerText);
            artikelProzessor.marke = (await titleDiv.evaluate(node => node.innerText)).split(" ")[0];
            artikelProzessor.preis = extrahiereFloat2(await priceDiv.evaluate(node => node.innerText));
            artikelProzessor.deliveryDate = extrahiereDatum(await liferungDiv.evaluate(node => node.innerText));
            artikelProzessor.produktlink = listVonUrlArtikel[i];
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
                                artikelProzessor.kerne = 4;
                            }else{
                                artikelProzessor.kerne = extrahiereZahl(data);
                            }
                            break;

                        case "Taktfrequenz":
                            artikelProzessor.taktfrequenz = data;
                            break;
                    
                        case "Anz. der Threads":
                            artikelProzessor.threads = konvertiereInInt(data, 'Threads');
                            break;
                    
                        case "Geeignete Sockel":
                            artikelProzessor.sockel = data;
                            break;

                        case "Thermal Design Power (TDP)":
                            artikelProzessor.stromverbrauch = konvertiereInInt(data, 'W');
                            break; 

                        case "Max. Turbo-Taktfrequenz":
                            artikelProzessor.maxTurboTaktfrequenz = extrahiereZahl(data);
                            break;  
                        
                        case "Typ":
                            if(hatInterneGrafik){
                                if(typeof artikelProzessor.CPUTyp === "undefined"){
                                    artikelProzessor.CPUTyp = data;
                                }else if(typeof artikelProzessor.interneGrafik === 'undefined'){
                                    artikelProzessor.interneGrafik = data;
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
            if(typeof artikelProzessor.interneGrafik === 'undefined'){
                artikelProzessor.interneGrafik = "ohne CPU-Grafik"
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
    console.log(listProzessorArtikle);
    console.log("total", listProzessorArtikle.length);

    /*
    // Daten ins Backend senden
    const axios = require('axios');
    const backendUrl = 'http://192.168.198.48:3000/api/scrapedata';

    const produktListe = { kategorie: 'CPU', value: listeArtikel };

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