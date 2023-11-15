const puppeteer = require('puppeteer');
const { filterKomponente, futureXUrls, extrahiereFloat2, extrahiereZahl, extrahiereDatum } = require('./funktionen.js');
const { Grafikkarte } = require('./models.js')

const merkmalKomponente = ["Kerne", "Threads", "Taktfrequenz", "Sockel", "(TDP)", "Grafik"];
let listeArtikel = [];

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let listVonUrlArtikel = await futureXUrls("https://www.future-x.de/Hardware-Netzwerk/PC-Komponenten/Grafikkarten/?b2bListingView=listing&manufacturer=7116423156f573e99f4b406a2a420bf7%7C7822381ecae1a830e0d8c2e4a0698eed%7Cb56458d3002c4ad4573fdbe6db5e6424%7C0e331880a5d81b1cf285aaa74ddeaa9c%7Cefac345f7b3291f3b7414172f3172fe4%7Cc8bb6924be62fc6dbb4ba30102f6ac67%7Cde598ec009abb957c81f5d2804eab984%7C36adccd0e112ccf4056ce14364e76d93%7C8914c48ee6e5960ae35b76cad57121d9%7Cd0f370d382f61624defc57ce6f6768ba%7Cf7c1c4d85cba3eca946a4de14f69010f%7C0ecc3a4d8e00c20ce45874dafb134a60&p=", 1);
    
    //await page.waitForTimeout(5000);

    for(let i = 0; i < listVonUrlArtikel.length; i++){ 
        await page.goto(listVonUrlArtikel[i]);
        let artikel = new Grafikkarte();

        try{
            const containerFluid = await page.$('main > .container-main');
            const titleDiv = await containerFluid.$('.cms-element-product-name > h1');
            const priceDiv = await containerFluid.$('.product-detail-price-container > p');
            const liferungDiv = await containerFluid.$('.product-detail-delivery-information p');
            const detailsSelektor = await containerFluid.$$('div.product-detail-description-text:nth-child(1) .table > tbody:nth-child(1) tr')
            const imgSelektor = await containerFluid.$('.img-fluid.gallery-slider-image.magnifier-image.js-magnifier-image');

            artikel.shopID = 2;
            artikel.kategorie = 'Grafikkarte';
            artikel.bezeichnung = await titleDiv.evaluate(node => node.innerText);
            artikel.preis = extrahiereFloat2(await priceDiv.evaluate(node => node.innerText));
            artikel.marke = artikel.bezeichnung.split(" ")[0];
            //artikelProzessor.deliveryDate = extrahiereDatum(await liferungDiv.evaluate(node => node.innerText)); 
            artikel.deliveryDate = extrahiereDatum(await liferungDiv.evaluate(node => node.innerText));
            artikel.produktlink = listVonUrlArtikel[i];
            artikel.imgUrl = await imgSelektor.evaluate(node => node.getAttribute('src'));


            for(const element of detailsSelektor){
                const data = await page.evaluate(el => el.querySelector('td:nth-child(2)').textContent, element);
                const merkmal = await page.evaluate(el => el.querySelector('th:nth-child(1)').textContent, element);

                if(data || merkmal){
                    if(merkmal === "Installierte Größe"){
                        artikel.speicherKapazitaet = extrahiereZahl(data); 
                    }else if(merkmal === "Grafikprozessor"){
                        artikel.grafikprozessor = data; 
                    }else if(merkmal === "Leistungsaufnahme im Betrieb"){
                        artikel.durchschnittlicherVerbrauch = data; 
                    }else if(merkmal === "Anzahl der CUDA-Kerne" || merkmal === 'Anzahl der Streamprozessoren'){
                        artikel.streamprozessorenAnzahl = data; 
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