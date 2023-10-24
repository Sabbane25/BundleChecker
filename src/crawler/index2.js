const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = 'https://www.alternate.de/configurator.xhtml?pca=20&pco=44&pcs=relevance';

  await page.goto(url);

  for(let i = 0; i < 25; i++){

    const element = await page.$('#tle-configurator-components\\:components\\:0\\:component-form\\:tle-configurator-listing\\:listing-items\\:'+i+'\\:listingitem-container');
    
    const contenu = await page.evaluate(element => {
      const data = [
        {product_name: element.querySelector('.col-12.font-weight-bold.product-name').textContent,
         stand: element.querySelector('.col-12.d-none.d-md-block').querySelector('small').innerText,
         img_url: 'https://www.alternate.de' + element.querySelector('.col-auto.px-2.position-relative').querySelector('img').getAttribute('src'),
         stand: element.querySelector('.col-12.d-none.d-md-block').querySelector('small').innerText,
         description: Array.from(element.querySelector('.col-12.d-none.d-md-block').querySelectorAll('small')).map((element) => element.innerText).join(' '),
         artikel: element.querySelector('.row.collapse.details-section').querySelector('.col-12').getAttribute('data-kid')
        }
      ]
      return data;
    }, element);

    console.log('Contenu de l\'élément:', contenu);
    console.log("Nombre total de page: " + i);
  }
 // console.log('Contenu de l\'élément:', contenu);

  await browser.close();
})();