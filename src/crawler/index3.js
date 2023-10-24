const puppeteer = require('puppeteer');

(async () => {
  // Lancer le navigateur et ouvrir une nouvelle page
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });
  const page = await browser.newPage();

  await page.waitForTimeout(5000);

  // Naviguer vers l'URL de la page
  await page.goto('https://www.computeruniverse.net/de/c/hardware-komponenten/prozessoren');

  //Liste von Url für jeden Artikel
  let listVonUrlArtikel = [];

  // Utilisez page.$$eval pour extraire toutes les données
  const elements = await page.$$('.AlgoliaHooks_hits__FFyff div.ProductListItemRow_product__zBkg9');

  for(let element of elements){

    const data = {
      url : await page.evaluate(el => el.querySelector(".Headline_default__gy8uA.Headline_h5__RK7OZ.ProductListItemRow_head__name___YFPb a").getAttribute('href') , element), 
      Title : await page.evaluate(el => el.querySelector(".Headline_default__gy8uA.Headline_h5__RK7OZ.ProductListItemRow_head__name___YFPb a").getAttribute('title') , element),
      IMG_URL : await page.evaluate(el => el.querySelector(".EdgeImage_effect_blur__9lqeO img").getAttribute('src') , element),
      Preis : await page.evaluate(el => el.querySelector(".at__price.relative") , element),
      Eigenschaften : await page.evaluate(el => el.querySelector(".ProductListItemRow_content__desc__a9NeJ .bullet-points.text-left").querySelector('.bullet-points__point').textContent , element),
    }

    listVonUrlArtikel.push(data);
    //console.log(urlArtikel);
  }

  
  console.log(listVonUrlArtikel);

  // Navigator schliessen
  await browser.close();
})();
