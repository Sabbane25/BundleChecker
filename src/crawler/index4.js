const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = 'https://www.notebooksbilliger.de/pc+systeme';

  await page.goto(url);

 // await page.waitForSelector('#listing-4col', { timeout: 10000 }); // Attendre que l'élément soit présent

  for(let i = 0; i < 55; i++) {
    //const element = await page.$('#splide01-list');
    
    const contenu = await page.evaluate(el => {
      const data = [
        { product_name: el }
      ]
      return data;
    }, element);

    console.log('Contenu de l\'élément:', contenu);
    console.log("Nombre total de page: " + i);
  }

  await browser.close();
})();
