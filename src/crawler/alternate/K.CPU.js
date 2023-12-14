// Autor: Oussama Soujoud

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
    const ShopID = 1;

    for (const productURL of productURLs) {
      // Neue Seite für jedes Produkt erstellen mit 10s Zeitüberschreitung
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(10000);

      try {
        // Produktseite aufrufen und auf das Laden der Inhalte warten
        await page.goto(productURL, { waitUntil: 'domcontentloaded' });
        await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

        // Produktinformationen extrahieren
        const productInfo = await page.$$eval('.d-block.details-www table tr', (elements) => {
          const productData = {};
          for (const element of elements) {
            const c1 = element.querySelector('td.c1')?.textContent;
            const c2 = element.querySelector('td.c2')?.textContent;
            const c4 = element.querySelector('td.c4')?.textContent;
            
            // Daten entsprechend der Spalten extrahieren und speichern
            if (c1 === 'Sockel' || c1 === 'Stromverbrauch (TDP)'|| c1 === 'CPU-Typ') {
              productData[c1] = c4;
            }

            if (c2 === 'Anzahl' || c2 === 'Threads' || c2 === 'Taktfrequenz' || c2 === 'GPU' || c2 === 'Kerntyp 1' || c2 === 'Turbo-Modus') {
              productData[c2] = c4;
            }
          }

          return productData;
        });
    

        // Extrahieren der Turbo-Geschwindigkeit(manchmal Turbo ist in Taktfrequenz geschrieben)
        const Turbo = productInfo['Turbo-Modus']
        ? parseInt(productInfo['Turbo-Modus'].replace(/[^\d.,]+/g, ''), 10)
        : (productInfo['Taktfrequenz'] && productInfo['Taktfrequenz'].split(',')[1]
          ? parseInt(productInfo['Taktfrequenz'].split(',')[1].replace(/\D/g, ''), 10)
          : 0);
      
        // Extrahieren des Produkt- und Kategorienamens
        const productNameElement = await page.$('.product-name');
        const productName = await page.evaluate((element) => element.textContent, productNameElement);
        const [splitName, category] = productName.split(',');
        const ProductName = splitName.trim();
        const Category = category ? category.trim() : '';
        const Marke = ProductName.split(' ')[0].replace(/®/g, '');

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

        // Bild-URLs extrahieren
        const ImageUrls = await page.$$eval('.cursor-magnify.img-fluid.img-sized', (images) => {
          return images.map((img) => img.getAttribute('src'));
        });

        // Verfügbarkeit des Produkts extrahieren
        const Verfügbarkeit = await page.$eval('div.col-12.p-3.text-center span.d-flex b', (element) => {
          return element.textContent.trim();
        });
        const src = 'www.alternate.de' + ImageUrls[0];
        const splitUrls = src.split(',');

        // Preis extrahieren
        const price = await page.$eval('.price', (element) => {
          const priceString = element.textContent.trim();
          return parseFloat(priceString.replace(/[^\d.,]+/g, '').replace('.', '').replace(',', '.'));
        });

        // Anzahl Kerne und Threads extrahieren und Fall, wenn Kerne und Threads nicht im Spalte Anzahl unf Threads sind
        let anzahl = productInfo['Anzahl'];
        let threads = productInfo['Threads'];

        // Fehlende Informationen aus einem anderen Feld extrahieren, falls vorhanden
        if (!anzahl || !threads) {
          const kerntyp1 = productInfo['Kerntyp 1'];
          if (kerntyp1) {
            const extractedNumbers = extractNumbersFromString(kerntyp1);
            if (extractedNumbers.length > 0) {
              if (!anzahl) {
                anzahl = extractedNumbers[0];
              }
              if (!threads && extractedNumbers.length > 1) {
                threads = extractedNumbers[1];
              }
            }
          }
        }

        // Weitere Produktinformationen extrahieren mit Typkonvertierung
        const tdpString = productInfo['Stromverbrauch (TDP)'];
        const TDP = tdpString ? parseInt(tdpString, 10) : '';
        const Kerne = parseInt(anzahl);
        const Thread = parseInt(threads);
        const Sockel = productInfo['Sockel'];
        const Takt = productInfo['Taktfrequenz'].split(',')[0];
        const Typ = productInfo['CPU-Typ'];
        const Intern = productInfo['GPU'];
        const Preis = parseFloat(price).toFixed(2);
        const workdays = calculateWorkingDays(deliveryDate);
        const image = splitUrls[0];
        const taktfrequenz = Takt.replace('Basistakt ', '').replace(/\./g, '');


        const scrapedProductData = {
          url: productURL|| '',
          productName: ProductName || '',
          category: Category || '',
          shopID: ShopID || '',
          sockel: Sockel || '',
          anzahl: Kerne || '',
          threads: Thread || '',
          taktfrequenz: taktfrequenz || '',
          typ: Typ || '',
          gpu: Intern || '',
          stromverbrauch: TDP || '',
          price: Preis || '',
          deliveryDate: workdays || '',
          image: image || '',
          turbo: Turbo || 0,
          marke: Marke || '',
          verfügbarkeit: Verfügbarkeit|| '',
        };
        console.log(scrapedProductData);

        // Daten per POST an den Server senden
      await axios.post('http://192.168.198.48:3000/api/scrapedata2', [scrapedProductData]);
      } catch (error) {
        // Fehlerbehandlung bei Scrapen des Produkts
       console.error(`Error scraping product ID ${productURL}: ${error.message}`);
      } finally {
        await page.close();
      }
    }
    await browser.close();
  }
  // Funktion zum Extrahieren von Zahlen aus einem String
  function extractNumbersFromString(inputString) {
    const numbers = inputString.match(/\d+/g);
    return numbers ? numbers.map(Number) : [];
  }
 
  // Neue Seite öffnen und URL aufrufen
  const page = await browser.newPage();
  const url = 'https://www.alternate.de/configurator.xhtml?pca=20&pco=44&pcp=5&pcs=relevance';
  await page.goto(url);

  // Produktelemente extrahieren
  const productData = await page.$$eval('.col-12[data-kid]', (elements) => {
    return elements.map((element) => element.getAttribute('data-kid'));
  });

  // Produkte in Gruppen verarbeiten und scrapen, damit der Puppeteer-Browser nicht scheitert
  const chunkSize = 5;
  for (let i = 0; i < productData.length; i += chunkSize) {
    const chunk = productData.slice(i, i + chunkSize);
    await scrapeProducts(chunk.map((pkid) => `https://www.alternate.de/configurator.xhtml?pca=20&pco=44&pkid=${pkid}&pcs=relevance`));
  }

  // Browser schließen
  await browser.close();
})();
