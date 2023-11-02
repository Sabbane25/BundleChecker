const mysql = require('mysql');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();

  async function scrapeProducts(productURLs) {
    const connection = mysql.createConnection({
      socketPath: '/var/run/mysqld/mysqld.sock',
      user: 'tim',
      password: '201922255',
      database: 'BundleChecker'
    });

    const ShopID = 1;

    for (const productURL of productURLs) {
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(120000);

      try {
        await page.goto(productURL, { waitUntil: 'domcontentloaded' });
        await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

        const productInfo = await page.$$eval('.d-block.details-www table tr', (elements) => {
          const productData = {};
          for (const element of elements) {
            const c1 = element.querySelector('td.c1')?.textContent;
            const c2 = element.querySelector('td.c2')?.textContent;
            const c4 = element.querySelector('td.c4')?.textContent;

            if (c1 === 'Sockel' || c1 === 'Stromverbrauch (TDP)') {
              productData[c1] = c4;
            }

            if (c2 === 'Anzahl' || c2 === 'Threads' || c2 === 'Taktfrequenz' || c2 === 'GPU' || c2 === 'Kerntyp 1') {
              productData[c2] = c4;
            }
          }

          return productData;
        });

        const productNameElement = await page.$('.product-name');
        const productName = await page.evaluate((element) => element.textContent, productNameElement);

        const [splitName, category] = productName.split(',');
        const ProductName = splitName.trim();
        const Category = category ? category.trim() : '';

        let deliveryDate = await page.$eval('[data-bs-content]', (element) => {
          const deliveryContent = element.getAttribute('data-bs-content');
          const match = deliveryContent.match(/\d+/);
          return match ? parseInt(match[0], 10) : 0;
        });

        if (!deliveryDate) {
          deliveryDate = await page.$eval('#popover89443 > div.popover-body', (element) => {
            const content = element.textContent;
            const match = content.match(/\d+/);
            return match ? parseInt(match[0], 10) : 0;
          });
        }

        const price = await page.$eval('.price', (element) => {
          const priceString = element.textContent.trim();
          return parseFloat(priceString.replace(/[^\d.,]+/g, '').replace('.', '').replace(',', '.'));
        });

        let anzahl = productInfo['Anzahl'];
        let threads = productInfo['Threads'];

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

        // Construct the object with scraped data
        const scrapedProductData = {
          productName: ProductName || '',
          category: Category || '',
          shopID: ShopID,
          sockel: productInfo['Sockel'] || '',
          anzahl: parseInt(anzahl) || '',
          threads: parseInt(threads) || '',
          taktfrequenz: productInfo['Taktfrequenz'] || '',
          gpu: productInfo['GPU'] || '',
          stromverbrauch: productInfo['Stromverbrauch (TDP)'] || '',
          price: parseFloat(price).toFixed(2) || '',
          deliveryDate: deliveryDate || ''
        };

        // Inserting the scraped data into the database tables
        const [articleResult] = await connection.query(
          'INSERT INTO Artikel (Kategorie, Preis, ShopID, ProduktUrl, Bezeichnung, LieferDatum) VALUES (?, ?, ?, ?, ?, ?)',
          [scrapedProductData.category, scrapedProductData.price, scrapedProductData.shopID, productURL, scrapedProductData.productName, scrapedProductData.deliveryDate]
        );

        const artikelnummer = articleResult.insertId;

        await connection.query(
          'INSERT INTO CPU (Artikelnummer, Url, Sockel, AnzahlKerne, Stromverbrauch, Taktfrequenz, InterneGrafik, Threads) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [artikelnummer, productURL, scrapedProductData.sockel, scrapedProductData.anzahl, scrapedProductData.stromverbrauch, scrapedProductData.taktfrequenz, scrapedProductData.gpu, scrapedProductData.threads]
        );
      } catch (error) {
        console.error(`Error scraping product ID ${productURL}: ${error.message}`);
      } finally {
        await page.close();
      }
    }

    // Close the database connection
    connection.end();
  }

  function extractNumbersFromString(inputString) {
    const numbers = inputString.match(/\d+/g);
    return numbers ? numbers.map(Number) : [];
  }

  const page = await browser.newPage();
  const url = 'https://www.alternate.de/configurator.xhtml?pca=20&pco=44&pcp=5&pcs=relevance';
  await page.goto(url);

  const productData = await page.$$eval('.col-12[data-kid]', (elements) => {
    return elements.map((element) => element.getAttribute('data-kid'));
  });

  const chunkSize = 5;
  for (let i = 0; i < productData.length; i += chunkSize) {
    const chunk = productData.slice(i, i + chunkSize);
    await scrapeProducts(chunk.map((pkid) => `https://www.alternate.de/configurator.xhtml?pca=20&pco=44&pkid=${pkid}&pcs=relevance`));
  }

  await browser.close();
})();
