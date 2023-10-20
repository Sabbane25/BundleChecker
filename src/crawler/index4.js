const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let url = 'https://www.alternate.de/configurator.xhtml?pca=20&pco=44&pcs=relevance';
  const selectorID = '#tle-configurator-components\\:components\\:0\\:component-form\\:tle-configurator-listing\\:load-more-products-btn';
  let gibNaechsteSeite;

  let istClickbar = true; 
  let i = 0;
  let currentUrl = "";

  while(istClickbar){

  await page.goto(url);

    gibNaechsteSeite = await page.$(selectorID); // Stockez l'élément dans une variable
      if (gibNaechsteSeite) {
        await gibNaechsteSeite.click();
        url = page.url();
        currentUrl = url;
        //console.log("Le clic a fonctionné.");
        //console.log('Url actuelle :', url)
      } else {
        //console.log("L'élément n'a pas été trouvé.");
        url = page.url();
        currentUrl = url;
        istClickbar = false;
      }
      console.log(currentUrl);
      i++;
  }

  console.log("curent url: ", url)

  await page.waitForTimeout(3000); // Attendre que les produits supplémentaires se chargent

  const elements = await page.$$('#tle-configurator-components\\:components\\:0\\:component-form\\:tle-configurator-listing\\:listingItems' + ' *');
    
  for(const element of elements){
    const tagName = await page.evaluate(el => el.tagName, element);
    if(tagName.toLowerCase() === 'a'){
      const linkContent =  await page.evaluate(el => {
        const data = [
          {product_name: el.querySelector('.col-12.font-weight-bold.product-name').textContent,
           preise: el.querySelector('.d-block.price ').innerHTML,
          }
        ]
        return data;
      }, element);
      console.log(linkContent);
    }
  }
  await browser.close();
})();
