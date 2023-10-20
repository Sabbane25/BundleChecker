const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let url = 'https://www.alternate.de/configurator.xhtml?pca=20&pco=44&pcs=relevance';
  const buttonSelektor = '#tle-configurator-components\\:components\\:0\\:component-form\\:tle-configurator-listing\\:load-more-products-btn';

  let i = 0; 
  let gibNaechsteSeite = true;

  while(gibNaechsteSeite){

    await page.goto(url);
    // Attendez que la page soit complètement chargée
    await page.waitForSelector(buttonSelektor); 

    try{
      // Cliquez sur le bouton
      await page.click(buttonSelektor);
      await page.waitForTimeout(3000);
      url =  page.url();
    }catch(error){
      gibNaechsteSeite = false;
      console.log('Programme terminE');
    }
    console.log(url);
    //i++;
  }

  console.log('Programme terminE 2');

  await browser.close();
})();