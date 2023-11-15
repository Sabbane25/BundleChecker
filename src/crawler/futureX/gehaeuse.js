const puppeteer = require('puppeteer');
const { konvertiereInFloat, futureXUrls, extrahiereDatum } = require('./funktionen');
const { Gehaeuse } = require('./models.js');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let listVonUrlArtikel = await futureXUrls("https://www.future-x.de/Hardware-Netzwerk/PC-Komponenten/PC-Gehaeuse/?b2bListingView=listing&manufacturer=c0ee3adfafa3b9ea51d4485d36376e55%7Ce2de4de843c845729d39507a8b1b8bdc%7Cd774528a8a6776870c89827bf2cb4434%7C4e718612b35ed7c909b1a2e01dc5a5c8%7Cd42456f2e1a42e4c5f3fd480828389ee%7Cec9b1ff8498a79838e60ecdb9fae4841%7C156119e710147a989122d0742caac8cc%7C3fcc134d7e39162d018119753075c44b%7Cc576e180e53c4138ad6514dfc6945dbd%7C9ee7f8502bed374d35e01291ee8b63c1%7Cec2f9ebeeb2333ef09d397898ee6f341%7Cfc7771d5bff5a78b8261beb83e21c378%7C5632977e5c4ad3264e953c18638feb95%7C008098e5c5a40c9418f582a185d199ed%7Cda9eb510bade2d40d83b762c9e7da1ea&p=", 1);
    let listProzessorArtikle = [];

    for(let i = 0; i < listVonUrlArtikel.length; i++){ 
        await page.goto(listVonUrlArtikel[i]);
        let artikelGehaeuse = new Gehaeuse();

        try{
            const containerFluid = await page.$('main > .container-main');
            const titleDiv = await containerFluid.$('.cms-element-product-name > h1');
            const priceDiv = await containerFluid.$('.product-detail-price-container > p');
            const liferungDiv = await containerFluid.$('.product-detail-delivery-information p');
            const detailsSelektor = await containerFluid.$$('div.product-detail-description-text:nth-child(1) .table tr');
            const imgSelektor = await containerFluid.$('.img-fluid.gallery-slider-image.magnifier-image.js-magnifier-image');

            artikelGehaeuse.shopID = 2;
            artikelGehaeuse.kategorie = 'Gehaeuse';
            artikelGehaeuse.bezeichnung = await titleDiv.evaluate(node => node.innerText);
            const preis = await priceDiv.evaluate(node => node.innerText);
            artikelGehaeuse.preis = konvertiereInFloat(preis);
            artikelGehaeuse.lieferDatum = extrahiereDatum(await liferungDiv.evaluate(node => node.innerText));
            artikelGehaeuse.produktlink = listVonUrlArtikel[i];
            artikelGehaeuse.marke = (await titleDiv.evaluate(node => node.innerText)).split(' ')[0];
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
                        artikelGehaeuse.breite = konvertiereInFloat(data);
                    }else if(merkmal === "Tiefe"){
                        artikelGehaeuse.tiefe = konvertiereInFloat(data);
                    }else if(merkmal === "Höhe"){
                        artikelGehaeuse.hoehe = konvertiereInFloat(data);
                    }else if(merkmal === "Hersteller-Formfaktor"){
                        artikelGehaeuse.produkttyp = data;
                    }
                }
            }
            listProzessorArtikle.push(artikelGehaeuse);
        }catch(error){
            console.error('Erreur de navigation :', error);
        }
    }

    console.log(listProzessorArtikle)
    await browser.close();
})();