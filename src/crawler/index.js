const puppeteer = require('puppeteer');

(async () => {
  // Lancer le navigateur et ouvrir une nouvelle page
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });
  const page = await browser.newPage();

  await page.waitForTimeout(10000);

  // Naviguer vers l'URL de la page
  await page.goto('https://www.computeruniverse.net/de/c/hardware-komponenten/prozessoren');

  //Liste von Url für jeden Artikel
  let listVonUrlArtikel = [];

  // Utilisez page.$$eval pour extraire toutes les données
  const elements = await page.$$('.AlgoliaHooks_hits__FFyff div.ProductListItemRow_product__zBkg9');

  for(let element of elements){

    const urlArtikel = await page.evaluate(el => el.querySelector("a.mb-4").getAttribute('href'), element)
    listVonUrlArtikel.push(urlArtikel);
  }

  console.log(listVonUrlArtikel);


  // Navigator schliessen
  await browser.close();
})();

