const puppeteer = require('puppeteer');
//import { testFunction } from './funktionen.js'

//Liste von Url für jeden Artikel
let listVonUrlArtikel = [];


(async () => {
const browser = await puppeteer.launch({ headless: false, defaultViewport: false });
const page = await browser.newPage();
await page.waitForTimeout(20000);

await page.goto("https://www.future-x.de/pc-geh%C3%A4use-c-17_24362_5345/");
await page.waitForTimeout(10000);

// Utilisez page.$$eval pour extraire toutes les données
const elements = await page.$$('.row.productRow.product_box.list-box');

for(let element of elements){
    const data = await page.evaluate(el => el.querySelector('.col-12.col-md-6.productText').querySelector('a').getAttribute('href'), element)
    console.log(data);
    listVonUrlArtikel.push(data);
}
console.log(listVonUrlArtikel);

await browser.close();
})();

