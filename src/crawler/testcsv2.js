const puppeteer = require('puppeteer');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

(async () => {
  const browser = await puppeteer.launch();

  async function scrapeProducts(productURLs) {
    const browser = await puppeteer.launch();

    const scrapedData = [];

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

            if (c2 === 'Anzahl' || c2 === 'Threads' || c2 === 'Taktfrequenz' || c2 === 'GPU') {
              productData[c2] = c4;
            }
          }

          return productData;
        });

        const productName = await page.$eval('.product-name', (element) => element.textContent);
        const deliveryDate = await page.$eval('[data-bs-content]', (element) => {
          const deliveryContent = element.getAttribute('data-bs-content');
          const match = deliveryContent.match(/(\w+\.\s\d+\.)\sund/);
          return match ? match[1] : '';
        });

        const price = await page.$eval('.price', (element) => {
          const priceString = element.textContent.trim();
          const priceInNumber = parseFloat(priceString.replace(/[^\d,.]+/g, '').replace('.', '').replace(',', '.'));
          return priceInNumber;
        });

        scrapedData.push({
          productName: productName.trim() || '',
          sockel: productInfo['Sockel'] || '',
          anzahl: parseInt(productInfo['Anzahl']) || '',
          threads: parseInt(productInfo['Threads']) || '',
          taktfrequenz: productInfo['Taktfrequenz'] || '',
          gpu: productInfo['GPU'] || '',
          stromverbrauch: productInfo['Stromverbrauch (TDP)'] || '',
          price: parseFloat(price).toFixed(2) || '',
          deliveryDate: deliveryDate || '',
        });
      } catch (error) {
        console.error(`Error scraping product ID ${productURL}: ${error.message}`);
      } finally {
        await page.close();
      }
    }

    return scrapedData;
  }

  const page = await browser.newPage();
  const url = 'https://www.alternate.de/configurator.xhtml?pca=20&pco=44&pcp=5&pcs=relevance';
  await page.goto(url);

  const productData = await page.$$eval('.col-12[data-kid]', (elements) => {
    return elements.map((element) => element.getAttribute('data-kid'));
  });

  const scrapedProducts = [];

  const chunkSize = 5;
  for (let i = 0; i < productData.length; i += chunkSize) {
    const chunk = productData.slice(i, i + chunkSize);
    const products = await scrapeProducts(chunk.map((pkid) => `https://www.alternate.de/configurator.xhtml?pca=20&pco=44&pkid=${pkid}&pcs=relevance`));
    scrapedProducts.push(...products);
  }

  await browser.close();

  const csvWriter = createCsvWriter({
    path: 'scraped_data.csv',
    header: [
      { id: 'productName', title: 'Bezeichnung' },
      { id: 'sockel', title: 'Sockel' },
      { id: 'anzahl', title: 'Anzahl' },
      { id: 'threads', title: 'Threads' },
      { id: 'taktfrequenz', title: 'Taktfrequenz' },
      { id: 'gpu', title: 'Interne GPU' },
      { id: 'stromverbrauch', title: 'Stromverbrauch (TDP)' },
      { id: 'price', title: 'Preis' },
      { id: 'deliveryDate', title: 'LieferDatum' },
    ],
  });

  await csvWriter.writeRecords(scrapedProducts);
})();
