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
    // Neue Seite für jedes Produkt erstellen mit 10s Zeitüberschreitung
    for (const productURL of productURLs) {
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(10000);

      try {
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

            // Daten entsprechend der Spalten extrahieren und speichern
            if (c2 === 'Bezeichnung') {
              productData[c2] = c4;
            }

            if (c2 === 'Kapazität' || c2 === 'Streamprozessoren' || c2 === 'Durchschnittlicher Verbrauch') {
              productData[c2] = parseInt(c4);
            }
          });

          return productData;
        });

        // Extrahieren von ProduktName, Category, Marken, BilderUrls und Verfügbarkeit
        const productNameElement = await page.$('.product-name');
        const productName = await page.evaluate((element) => element.textContent, productNameElement);

        const [splitName, category] = productName.split(',');
        const ProductName = splitName.trim();
        
        const Category = category ? category.trim() : '';
        const ImageUrls = await page.$$eval('.cursor-magnify.img-fluid.img-sized', (images) => {
          return images.map((img) => img.getAttribute('src'));
        });
        const src = 'www.alternate.de' + ImageUrls[0];
        const splitUrls = src.split(',');
        const Marke = ProductName.split(' ')[0];
      
        const Verfügbarkeit = await page.$eval('div.col-12.p-3.text-center span.d-flex b', (element) => {
          return element.textContent.trim();
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
        const Model = productInfo['Bezeichnung'];
        const StreamCPU = productInfo['Streamprozessoren'];
        const Kapazitaet = productInfo['Kapazität'];
        const Stromverbrauch = productInfo['Durchschnittlicher Verbrauch'];
        const Preis = parseFloat(price).toFixed(2);
        const workdays = calculateWorkingDays(deliveryDate);
        const image = splitUrls[0];
        const scrapedProductData = {
          url: productURL || '',
          productName: ProductName || '',
          category: Category || '',
          shopID: ShopID || '',
          verfügbarkeit: Verfügbarkeit || '',
          model: Model || '',
          streamCpu: StreamCPU || 0,
          stromverbrauch: Stromverbrauch || 0,
          kapazitaet: Kapazitaet || '',
          price: Preis || '',
          deliveryDate: workdays || '',
          image: image || '',
          marke: Marke || '',
        }
        console.log(scrapedProductData);

        // Daten per POST an den Server senden
       await axios.post(`http://${apiConfig.URL}/api/scrapedata2`, [scrapedProductData]);
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
  const url = 'https://www.alternate.de/configurator.xhtml?pca=20&pco=47&pcp=10&pcs=relevance';
  await page.goto(url);

  // Produktelemente extrahieren
  const productData = await page.$$eval('.col-12[data-kid]', (elements) => {
    return elements.map((element) => element.getAttribute('data-kid'));
  });

  // Produkte in Gruppen verarbeiten und scrapen, damit der Puppeteer-Browser nicht scheitert
  const chunkSize = 5;
  for (let i = 0; i < productData.length; i += chunkSize) {
    const chunk = productData.slice(i, i + chunkSize);
    await scrapeProducts(chunk.map((pkid) => `https://www.alternate.de/configurator.xhtml?pca=20&pco=47&pkid=${pkid}&pcs=relevance`));
  }

  // Browser schließen
  await browser.close();
})();
