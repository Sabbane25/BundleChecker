// Autor: Oussama Soujoud

const argv = require('yargs').argv;
const apiConfig = {
  HOST: argv.host === 'local' ? '127.0.0.1' : '192.168.198.48',
};

const puppeteer = require('puppeteer');
const axios = require('axios');
const { calculateWorkingDays } = require('./Date.js');
(async () => {
  // Start des Browser-Instances
  const browser = await puppeteer.launch();

  // Funktion zum Scrapen der Produkte
  async function scrapeProducts(productURL, productURLs) {
     // Neue Seite für jedes Produkt erstellen mit 10s Zeitüberschreitung
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(10000);

    try {
      for (const productURL of productURLs) {
         // Produktseite aufrufen und auf das Laden der Inhalte warten
        await page.goto(productURL, { waitUntil: 'domcontentloaded' });
        await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

        // Produktinformationen extrahieren
        const productInfo = await page.$$eval('.d-block.details-www table tr', (elements) => {
          const productData = {};

          elements.forEach((element) => {
            const c1 = element.querySelector('td.c1')?.textContent.trim();
            const c2 = element.querySelector('td.c2')?.textContent.trim();
            const c4 = element.querySelector('td.c4')?.textContent.trim();

            // Daten entsprechend der Spalten extrahieren und speicher
            if (c1 === 'Kapazität') {
              productData[c1] = c4;
            }

            if (c1 === 'Typ') {
              productData[c1] = c4;
            }

            if (c1 === 'Datentransferrate' && c2 === 'Lesen') {
              productData[c2] = parseInt(c4.replace('.', '').replace(/\./g, ''));
            }
            
            if (c2 === 'Schreiben' && !productData[c2]) {
              if (c4.includes('MB/s')) {
                productData[c2] = parseInt(c4.replace('.', '').replace(/\./g, ''));
              } else {
                productData[c2] = c4.includes('MB/s') ? parseInt(c4.replace('.', '').replace(/\./g, '')) : 0;
              }
            } else if (c2 === 'Schreiben') {
              productData[`${c2}_second`] = c4.includes('MB/s') ? parseInt(c4.replace('.', '').replace(/\./g, '')) : 0;
            }
          });

          return productData;
        });
     
        // Extrahieren von Marken, BilderUrls und Produktname
        const productNameElement = await page.$('.product-name');
        const productName = await page.evaluate((element) => element.textContent, productNameElement);
        const [splitName, category] = productName.split(',');
        const ProductName = splitName.trim();
        const ImageUrls = await page.$$eval('.cursor-magnify.img-fluid.img-sized', (images) => {
          return images.map((img) => img.getAttribute('src'));
        });
        const src = 'www.alternate.de' + ImageUrls[0];
        const splitUrls = src.split(',');
        let Marke;
        if (ProductName.split(' ')[0] == 'Team' || ProductName.split(' ')[1] == 'FURY'){
         Marke = ProductName.split(' ')[0] +' '+ ProductName.split(' ')[1]
        }else{
         Marke = ProductName.split(' ')[0];
        }

        // Lieferdatum auslesen
        let deliveryDate = await page.$eval('[data-bs-content]', (element) => {
          const deliveryContent = element.getAttribute('data-bs-content');
          const match = deliveryContent.match(/\d+/);
          return match ? parseInt(match[0], 10) : 0;
        });

        // Wenn Lieferdatum nicht verfügbar(bei Produkten mit Rabatt), Alternativ-Selektor verwenden
        if (!deliveryDate) {
          deliveryDate = await page.$$eval('.col-12.p-3.text-center [data-bs-content]', (element) => {
            const content = element.getAttribute('data-bs-content');
            const match = content.match(/\d+/); 
            return match ? parseInt(match[0], 10) : 0; 
          });
        }

        // Verfügbarkeit und Preis extrahieren
        const Verfügbarkeit = await page.$eval('div.col-12.p-3.text-center span.d-flex b', (element) => {
          return element.textContent.trim();
        });
        const price = await page.$eval('.price', (element) => {
          const priceString = element.textContent.trim();
          return parseFloat(priceString.replace(/[^\d.,]+/g, '').replace('.', '').replace(',', '.'));
        });

        // Weitere Produktinformationen extrahieren mit Typkonvertierung
        const ShopID = 1;
        const Kapazitaet = productInfo['Kapazität'];
        const Preis = parseFloat(price).toFixed(2);
        const lesen = productInfo['Lesen'];
        const schreiben = productInfo['Schreiben'];
        const workdays = calculateWorkingDays(deliveryDate);
        const image = splitUrls[0];
        const Category = 'Festplatte';
        let Typ
        if(productInfo['Typ'] == 'SSD'){
           Typ = 'Solid State Drive'
        }else{
           Typ = productInfo['Typ'];
        }
        const scrapedProductData = {
          url: productURL || '',
          productName: ProductName || '',
          shopID: ShopID || '',
          verfügbarkeit: Verfügbarkeit|| '',
          category: Category || '',
          kapazitaet: Kapazitaet || '',
          typ: Typ || '',
          price: Preis || '',
          deliveryDate: workdays || '',
          lesen: lesen || 0,
          schreiben: schreiben || 0,
          image: image || '',
          marke: Marke || '',
        }
        console.log(scrapedProductData);

        // Daten per POST an den Server senden
        await axios.post(`http://${apiConfig.HOST}:3000/api/scrapedata2`, [scrapedProductData]);
      }
    } catch (error) {
      // Fehlerbehandlung bei Scrapen des Produkts
      console.error(`Error scraping product ID ${productURL}: ${error.message}`);
    } finally {
      await page.close();
    }
  }

  // Urls von SSD und SATA 
  const urls = [
    'https://www.alternate.de/configurator.xhtml?pca=20&pco=69&pcp=20&pcs=relevance',
    'https://www.alternate.de/configurator.xhtml?pca=20&pco=71&pcp=6&pcs=relevance',
  ];

  for (const url of urls) {
    // Neue Seite öffnen und URL aufrufen
    const page = await browser.newPage();
    await page.goto(url);

    // Produktelemente extrahieren
    const productData = await page.$$eval('.col-12[data-kid]', (elements) => {
      return elements.map((element) => element.getAttribute('data-kid'));
    });

    // Produkte in Gruppen verarbeiten und scrapen, damit der Puppeteer-Browser nicht scheitert
    const chunkSize = 5;
    for (let i = 0; i < productData.length; i += chunkSize) {
      const chunk = productData.slice(i, i + chunkSize);
      const pkidURLs = chunk.map((pkid) => `${url}&pkid=${pkid}&pcs=relevance`);
      await scrapeProducts(url, pkidURLs);
    }
  }

  // Browser schließen
  await browser.close();
})();
