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

  console.log('Premiere boucle termine')

  //selectionne le ID du div qui contient tous les produits
  const elements = await page.$$('#tle-configurator-components\\:components\\:0\\:component-form\\:tle-configurator-listing\\:listingItems' + ' *');

  for (const element of elements) {
    // Vérifiez si l'élément est une balise <a>
    const tagName = await page.evaluate(el => el.tagName, element);
    if (tagName.toLowerCase() === 'a') {
      // Récupérez le contenu du lien
      const linkContent = await page.evaluate(el => el.tagName, element);
      const itemSelektor = await page.$(linkContent);


      try{
        if(await page.$(itemSelektor !== null)){
          //await page.waitForSelector(linkContent.toLowerCase(), { timeout: 1000 });
          await page.click(itemSelektor);
          await page.waitForTimeout(3000);
          // const linkId = await page.evaluate(el => el.getAttribute('id'), element);
          url = page.url();
          console.log('click', url);
        }else {

        }
      }catch (error) {
        // Si le bouton n'est plus présent, sortez de la boucle
        //console.log('Programme terminé en raison de l\'absence du bouton');
      }
      
      console.log('contenu ', linkContent.toLowerCase(), ' url:', url);
      //await page.goto(url);
    }
  }

  console.log('apres la contdition')
  
  await browser.close();
})();