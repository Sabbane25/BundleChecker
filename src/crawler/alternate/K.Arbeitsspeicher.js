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
  async function scrapeProducts(productURLs) {
    // Neue Browser-Seite öffnen
    const browser = await puppeteer.launch();

    for (const productURL of productURLs) {
       // Neue Seite für jedes Produkt erstellen mit 10s Zeitüberschreitung
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(10000);

      try {
         // Produktseite aufrufen und auf das Laden der Inhalte warten
        await page.goto(productURL, { waitUntil: 'domcontentloaded' });
        await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

        // Extrahieren des Produktnamens
        const productName = await page.$eval('.product-name', (element) => element.textContent);
        const [splitName, category] = productName.split(',');
        const ProductName = splitName.trim();
        //Category als Konstante
        const Category = 'RAM';

        // Extrahieren von Marken, BilderUrls und Verfügbarkeit
        let Marke;
        if (ProductName.split(' ')[0] == 'Team' || ProductName.split(' ')[1] == 'FURY'){
         Marke = ProductName.split(' ')[0] +' '+ ProductName.split(' ')[1]
        }else{
         Marke = ProductName.split(' ')[0];
        }
        const ImageUrls = await page.$$eval('.cursor-magnify.img-fluid.img-sized', (images) => {
          return images.map((img) => img.getAttribute('src'));
        });

        const Verfügbarkeit = await page.$eval('div.col-12.p-3.text-center span.d-flex b', (element) => {
          return element.textContent.trim();
        });
        const src = 'www.alternate.de' + ImageUrls[0];
        const splitUrls = src.split(',');

        // Produktinformationen extrahieren
        const productInfo = await page.$$eval('.d-block.details-www table tr', (elements) => {
          const productData = {};

          elements.forEach((element) => {
            const c2 = element.querySelector('td.c2')?.textContent.trim();
            const c1 = element.querySelector('td.c1')?.textContent.trim();
            const c4 = element.querySelector('td.c4')?.textContent.trim();

             // Daten entsprechend der Spalten extrahieren und speichern
            if (c1 === 'Typ') {
              productData[c1] = c4;
            }
            
            if (c1 === 'Spannung') {
              const firstNumberMatch = c4.match(/(\d+,\d+)/);
              productData[c1] = parseFloat(firstNumberMatch[1].replace(',', '.'));
            }

            if (c1 === 'Kapazität') {
              const number = c4.match(/\d+/);
              productData[c1] = number ? parseInt(number[0]) : null;
            }

            if (c2 === 'CAS Latency (CL)') {
              const number = c4.match(/\d+/);
              productData[c2] = number ? parseInt(number[0]) : null;
            }
          });

          return productData;
        });

        // Lieferdatum auslesen
        let deliveryDate = await page.$eval('[data-bs-content]', (element) => {
          const deliveryContent = element.getAttribute('data-bs-content');
          const match = deliveryContent.match(/\d+/); 
          return match ? parseInt(match[0], 10) : 0; 
        });

         // Wenn Lieferdatum nicht verfügbar(bei Produkten mit Rabatt), Alternativ-Selektor verwenden
        if (!deliveryDate) {
          deliveryDate = await page.$eval('.col-12.p-3.text-center [data-bs-content]', (element) => {
            const content = element.getAttribute('data-bs-content');
            const match = content.match(/\d+/); 
            return match ? parseInt(match[0], 10) : 0; 
          });
        }
 
        // Preis extrahieren
        const price = await page.$eval('.price', (element) => {
          const priceString = element.textContent.trim();
          return parseFloat(priceString.replace(/[^\d.,]+/g, '').replace('.', '').replace(',', '.'));
        });
        // Weitere Produktinformationen extrahieren mit Typkonvertierung
        const ShopID = 1;
        const productType = productInfo['Typ'] || productInfo['Art'];
        const Kapazitaet = productInfo['Kapazität'];
        const CL = productInfo['CAS Latency (CL)'];
        const Preis = parseFloat(price).toFixed(2);
        const workdays = calculateWorkingDays(deliveryDate);
        const image = splitUrls[0];
        const Spannung = productInfo['Spannung'];
        const scrapedProductData = {
          url: productURL || '',
          productName: ProductName || '',
          category: Category || '',
          shopID: ShopID || '',
          verfügbarkeit: Verfügbarkeit|| '',
          typ: productType || '',
          kapazitaet: Kapazitaet || '',
          latency: CL || '',
          price: Preis || '',
          deliveryDate: workdays || '',
          image: image || '',
          marke: Marke || '',
          spannung: Spannung || ''
        }
        console.log(scrapedProductData);

        // Daten per POST an den Server senden
        await axios.post(`http://${apiConfig.HOST}:3000/api/scrapedata2`, [scrapedProductData]);
      } catch (error) {
        // Fehlerbehandlung bei Scrapen des Produkts
        console.error(`Error scraping product ID ${productURL}: ${error.message}`);
      } finally {
        await page.close();
      }
    }

    await browser.close();
  }

  // Neue Seite öffnen und URL aufrufen
  const page = await browser.newPage();
  const url = 'https://www.alternate.de/configurator.xhtml?pca=20&pco=46&pcp=50&pcs=relevance';
  await page.goto(url);

  // Produktelemente extrahieren
  const productData = await page.$$eval('.col-12[data-kid]', (elements) => {
    return elements.map((element) => element.getAttribute('data-kid'));
  });

  // Produkte in Gruppen verarbeiten und scrapen, damit der Puppeteer-Browser nicht scheitert
  const chunkSize = 5;
  for (let i = 0; i < productData.length; i += chunkSize) {
    const chunk = productData.slice(i, i + chunkSize);
    await scrapeProducts(chunk.map((pkid) => `https://www.alternate.de/configurator.xhtml?pca=20&pco=46&pkid=${pkid}&pcs=relevance`));
  }

  // Browser schließen
  await browser.close();
})();
