const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const itemKategoriePage = await browser.newPage();

    const url = 'https://www.alternate.de/configurator.xhtml?pca=20&pco=0&pcs=default';
    const itemKategorie = 'https://www.alternate.de/configurator.xhtml?pca=20&pco=44&pcs=relevance';
   
    await page.goto(url);
    await itemKategoriePage.goto(itemKategorie);

    //on selection le Id de la page contenant toutes les differentes categories
    const element = await page.$('#tle-configurator-components\\:components-container');

    // recuperation du ID des differentes Kategories
    const contenu = await page.evaluate(element => {
        
        kategorie = [];
        j = 0;

        while(element.querySelector('#tle-configurator-components\\:components\\:'+j+'\\:component-form\\:component-heading') != null){
            kategorieId = +(element.querySelector('#tle-configurator-components\\:components\\:'+j+'\\:component-form\\:component-heading').getAttribute('data-cid'));
            kategorie.push(+kategorieId);
            j++;
        }
    
        return kategorie;

    }, element);
  
    console.log('Contenu de l\'élément:', contenu);


    //Id du Item de chaque categorie d'article
    const element2 = await itemKategoriePage.$('#tle-configurator-components\\:components\\:0\\:component-form\\:tle-configurator-listing\\:listing-items\\:0\\:listingitem-container');

    // retourne du ID des differentes Kategories
    /*const listKomponenten = await itemKategoriePage.evaluate(element2 => {
        data = element2.querySelector('.row.collapse.details-section ').querySelector('div').getAttribute('data-kid');
        return data;

    }, element2);
    console.log('Id von jeder Kategorie ' + listKomponenten);
    */

    await itemKategoriePage.click('a#tle-configurator-components\\:components\\:0\\:component-form\\:tle-configurator-listing\\:listing-items\\:0\\:j_idt1810');
    await itemKategoriePage.waitForNavigation();

  console.log('Nouvelle page :', itemKategoriePage.url());
    

    await browser.close();
})();