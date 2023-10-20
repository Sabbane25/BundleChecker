const puppeteer = require('puppeteer');



(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let url = 'https://www.alternate.de/configurator.xhtml?pca=20&pco=44&pcs=relevance';
  const buttonSelektor = '#tle-configurator-components\\:components\\:0\\:component-form\\:tle-configurator-listing\\:load-more-products-btn';

  let i = 0; 
  let gibNaechsteSeite = true;

  while (gibNaechsteSeite) {
    await page.goto(url);

    try {
      // Attendez que le bouton soit présent pendant 1 seconde
      await page.waitForSelector(buttonSelektor, { timeout: 1000 });

      if (await page.$(buttonSelektor) !== null) {
        // Cliquez sur le bouton
        await page.click(buttonSelektor);
        await page.waitForTimeout(3000);
        url = page.url();
      } else {
        gibNaechsteSeite = false;
        console.log('Programme terminé');
      }
    } catch (error) {
      // Si le bouton n'est plus présent, sortez de la boucle
      gibNaechsteSeite = false;
      console.log('Programme terminé en raison de l\'absence du bouton');
    }
    console.log(url);
  }

  //selectionne le ID du div qui contient tout les produits
  const idKomponentenListe = await page.$('#tle-configurator-components\\:components\\:0\\:component-form\\:tle-configurator-listing\\:listingItems');
  const elements = 
  await browser.close();
})();