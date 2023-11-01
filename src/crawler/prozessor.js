const puppeteer = require('puppeteer');
const { scrapeComputerUniverseUrls } = require('./funktionen');

//Liste von Url für jeden Artikel
let listVonUrlArtikel = [];

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.waitForTimeout(5000);
    await page.goto('https://www.future-x.de/cpus-c-17_24362_5330/?cPath=17_24362_5330&clu0=Hersteller%3A%3AIntel&clu50=CPU-Typ%3A%3ADesktop-CPU&page=3')

    const elements = await page.$$('#technicalDetails td:nth-child(2)');

        for(let element of elements){
        const data = await page.evaluate(el => el.textContent, element)
        //console.log(data);
        listVonUrlArtikel.push(data);
    }
    

    console.log(listVonUrlArtikel);
    await browser.close();
})();