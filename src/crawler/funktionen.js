const puppeteer = require('puppeteer');

async function scrapeComputerUniverseUrls(url, anzahlSeite) {

  let linkListe = [];
  const browser = await puppeteer.launch();

  for(let i = 1; i < anzahlSeite; i++){

    const page = await browser.newPage();
    await page.waitForTimeout(10000);
  
    await page.goto(url + i);
    //await page.waitForTimeout(10000);

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

function filterKomponente(satz, wort) {
  const komponenten = satz.split(" "); // Divise la phrase en mots
  for (const komponent of komponenten) {
    if (komponent === wort) {
      return komponent; // Retourne le mot recherché s'il est trouvé
    }
  }
  return null; // Retourne null si le mot n'est pas trouvé
}


module.exports = {
  scrapeComputerUniverseUrls,
  filterKomponente
};
