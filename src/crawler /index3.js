const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = 'https://www.alternate.de/configurator.xhtml?pca=20&pco=0&pcs=default';

  await page.goto(url);

  

    const element = await page.$('#tle-configurator-components\\:components-container');
    
    
    const contenu = await page.evaluate(element => {

        kategorie = [];
        gibKategorie = ""; 
        j = 0;

        while(element.querySelector('#tle-configurator-components\\:components\\:'+j+'\\:component-form\\:component-heading') != null){
            kategorie.push([
                Kategorie = element.querySelector('#tle-configurator-components\\:components\\:'+j+'\\:component-form\\:component-heading').querySelector('span').innerText,
                Kategorie = element.querySelector('#tle-configurator-components\\:components\\:'+j+'\\:component-form\\:component-heading').getAttribute('data-cid')
            ]);
            gibKategorie = element.querySelector('#tle-configurator-components\\:components\\:'+j+'\\:component-form\\:component-heading');
            j++;
        }
    
        return kategorie;

    }, element);

    console.log('Liste de toutes les Categories: ', contenu);
  
 // console.log('Contenu de l\'élément:', contenu);

  await browser.close();
})();