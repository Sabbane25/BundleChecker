const puppeteer = require('puppeteer');

async function scrapeComputerUniverseUrls(url, anzahlSeite) {

  let linkListe = [];
  const browser = await puppeteer.launch();

  for(let i = 1; i < anzahlSeite; i++){

    const page = await browser.newPage();
    await page.waitForTimeout(20000);
  
    await page.goto(url + i);
    await page.waitForTimeout(10000);

    // Utilisez page.$$eval pour extraire toutes les données
    const elements = await page.$$('.row.productRow.product_box.list-box');

    for(let element of elements){
        const link = await page.evaluate(el => el.querySelector('.col-12.col-md-6.productText').querySelector('a').getAttribute('href'), element)
        linkListe.push(link);
    }
  }
  console.log(linkListe.length);

  await browser.close();

  return linkListe;
}


module.exports = {
  scrapeComputerUniverseUrls
};
