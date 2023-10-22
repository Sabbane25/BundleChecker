const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = 'https://www.notebooksbilliger.de/';

  await page.goto(url);

  const element = await page.$('.logo.logo--navigation');
    
    const contenu = await page.evaluate(element => {

      const data = [
        {product_name: element.querySelector('a').innerHTML,
        }
      ]
      return data;
    }, element);

  console.log('Titre de la page:', contenu);

  await browser.close();
})();