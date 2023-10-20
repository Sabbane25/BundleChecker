const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = 'https://www.alternate.de/configurator.xhtml?pca=20&pco=44&pcs=relevance';
  const selektorID = "#tle-configurator-components\\:components\\:0\\:component-form\\:tle-configurator-listing\\:load-more-products-btn";

  await page.goto(url);

  const element = await page.$(selektorID);

  const contenu = await page.evaluate(element => {

    const data = [
      {
       button: element.textContent
      }
    ]
    return data;
  }, element);

  //await page.waitForSelector(selektorID);

 // await page.waitForTimeout(3000);

 console.log(contenu);


  await browser.close();
})();