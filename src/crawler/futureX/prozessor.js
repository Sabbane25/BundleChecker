const puppeteer = require('puppeteer');
const { scrapeComputerUniverseUrls } = require('./funktionen');
const { filterKomponente } = require('./funktionen');

//Liste von Url für jeden Artikel
let listVonUrlArtikel = [];

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.waitForTimeout(10000);
    await page.goto('https://www.future-x.de/AMD-Ryzen-9-7950X-4500-AM5-WOF-R9-Sockel-Zen4/999515976')

    const containerFluid = await page.$('main > .container-main .cms-section-default.boxed');

    //cms-block  pos-2 cms-block-product-description-reviews

        if (containerFluid) {
            // Utilisez `element.$` pour sélectionner un élément enfant par classe
            const titleDiv = await containerFluid.$('.col-md-9.col-lg-8.productTitle > h1');
            const priceSelektor = await containerFluid.$('.row.mt-0.mt-md-3 .productPriceInner.pb-0.d-inline-block.w-100 .price');
            const datum = await containerFluid.$('.row.mt-0.mt-md-3 .productPriceInner.pb-0.d-inline-block.w-100');

            if (titleDiv) {
                const title = await titleDiv.evaluate(node => node.textContent);
                const price = await priceSelektor.evaluate(node => node.textContent);
                const Formfaktor = await page.evaluate(el => el.querySelector('.row.mt-0.mt-md-3 .productPriceInner.pb-0.d-inline-block.w-100 .price').textContent, containerFluid);
                console.log(title);
                console.log(price);
                console.log(Formfaktor);

                const details = await containerFluid.$$('#HTML_SPEC .ITSr0')

                for(const element of details){
                    const data = await page.evaluate(el => el.querySelector('div:nth-child(1)').textContent, element);
                    if(filterKomponente(data, "Threads") === "Threads"){
                        console.log('###################', data);
                        const data2 = await page.evaluate(el => el.querySelector('div:nth-child(2)').textContent, element);
                        console.log('###################', data2);
                    }
                }

            } else {
                console.log("Div spécifique introuvé.");
            }
        }

    await browser.close();
})();