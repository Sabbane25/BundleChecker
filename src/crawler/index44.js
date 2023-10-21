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
      //await page.waitForSelector(buttonSelektor, { timeout: 1000 });

      if (await page.$(buttonSelektor) !== null) {
        // Cliquez sur le bouton
        await page.click(buttonSelektor);
        await page.waitForTimeout(1000);
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

  console.log('hor de la boucle')

  //selectionne le ID du div qui contient tous les produits
  const elements = await page.$$('#tle-configurator-components\\:components\\:0\\:component-form\\:tle-configurator-listing\\:listingItems' + ' *');

  for (const element of elements) {
    console.log('0er console ' ,page.url())
    // Vérifiez si l'élément est une balise <a>
    const tagName = await page.evaluate(el => el.tagName, element);
    if (tagName.toLowerCase() === 'a') {
      // Récupérez l'URL du lien
      const linkURL = await page.evaluate(el => el.href, element);
      const itemSelektorClass = 'a#tle-configurator-components\\:components\\:0\\:component-form\\:tle-configurator-listing\\:listing-items\\:0\\:j_idt1909';

      //await page.goto(url);

      console.log('1er console ' ,page.url())
      // Cliquez sur le lien pour accéder à son contenu
      await page.click(itemSelektorClass);
      console.log('2em console ', page.url())
      await page.waitForNavigation({ timeout: 60000 });
      console.log('3eme ', page.url())
      
      // À ce stade, vous êtes sur la page liée par le lien, et vous pouvez extraire le contenu que vous souhaitez

      // Revenez à la page précédente
     // await page.goBack();
    }
  }

  console.log('apres la contdition')
  
  await browser.close();
})();