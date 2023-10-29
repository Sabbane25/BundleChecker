const puppeteer = require('puppeteer');
const { scrapeComputerUniverseUrls } = require('./funktionen');

//Liste von Url für jeden Artikel
let listVonUrlArtikel = [];

//for(let i = 0; i < urls.length; i++){

  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.waitForTimeout(20000);

    const result = await scrapeComputerUniverseUrls("https://www.future-x.de/festplatten-c-17_24362_5440/?cPath=17_24362_5440&page=", 2)

    for(let i = 0; i < result.length; i++){

        await page.goto(result[i],);
        await page.waitForTimeout(10000);
    
        // Utilisez page.$$eval pour extraire toutes les données
        const elements = await page.$$('#technicalDetails td:nth-child(2)');
    
        for(let element of elements){
        const data = await page.evaluate(el => el.textContent, element)
        //console.log(data);
        listVonUrlArtikel.push(data);
        }
    }

    console.log(listVonUrlArtikel);
    await browser.close();
  })();