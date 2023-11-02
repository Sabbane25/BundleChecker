const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();

  async function scrapeProducts(productURLs) {
    const browser = await puppeteer.launch();

    for (const productURL of productURLs) {
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(10000);

      try {
        await page.goto(productURL, { waitUntil: 'domcontentloaded' });
        await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

        const productInfo = await page.$$eval('.d-block.details-www table tr', (elements) => {
          const productData = {};

          elements.forEach((element) => {
            const c1 = element.querySelector('td.c1')?.textContent.trim();
            const c2 = element.querySelector('td.c2')?.textContent.trim();
            const c4 = element.querySelector('td.c4')?.textContent.trim();

            if (c1 === 'belegte Slots') {
              productData[c1] = parseFloat(c4);
            }

            if (c1 === 'Anschlüsse') {
              productData[c1] = c4;
            }

            if (c2 === 'Kapazität') {
              productData[c2] = parseInt(c4);
            }
          });

          return productData;
        });

        const productNameElement = await page.$('.product-name');
        const productName = await page.evaluate((element) => element.textContent, productNameElement);

        const [splitName, category] = productName.split(',');
        const ProductName = splitName.trim();
        const Category = category ? category.trim() : '';

        let deliveryDate = await page.$eval('[data-bs-content]', (element) => {
          const deliveryContent = element.getAttribute('data-bs-content');
          const match = deliveryContent.match(/\d+/); // Extracts the first number from the delivery date
          return match ? parseInt(match[0], 10) : 0; // Returns the first number as an integer
        });

        if (!deliveryDate) {
          deliveryDate = await page.$eval('#popover89443 > div.popover-body', (element) => {
            const content = element.textContent;
            const match = content.match(/\d+/); // Extracts the first number from the alternative delivery date element
            return match ? parseInt(match[0], 10) : 0; // Returns the first number as an integer
          });
        }

        const price = await page.$eval('.price', (element) => {
          const priceString = element.textContent.trim();
          return parseFloat(priceString.replace(/[^\d.,]+/g, '').replace('.', '').replace(',', '.'));
        });
        const Slots = productInfo['belegte Slots'];
        const Anschlüsse = productInfo['Anschlüsse'];
        const Kapazitaet = productInfo['Kapazität'];
        const Preis = parseFloat(price).toFixed(2);

        console.log([
          productURL || '',
          ProductName || '',
          Category || '',
          Slots || '',
          Anschlüsse || '',
          Kapazitaet || '',
          Preis || '',
          deliveryDate || '',
        ]);
      } catch (error) {
        console.error(`Error scraping product ID ${productURL}: ${error.message}`);
      } finally {
        await page.close();
      }
    }

    await browser.close();
  }

  const page = await browser.newPage();
  const url = 'https://www.alternate.de/configurator.xhtml?pca=20&pco=47&pcp=10&pcs=relevance';
  await page.goto(url);

  const productData = await page.$$eval('.col-12[data-kid]', (elements) => {
    return elements.map((element) => element.getAttribute('data-kid'));
  });

  const chunkSize = 5;
  for (let i = 0; i < productData.length; i += chunkSize) {
    const chunk = productData.slice(i, i + chunkSize);
    await scrapeProducts(chunk.map((pkid) => `https://www.alternate.de/configurator.xhtml?pca=20&pco=47&pkid=${pkid}&pcs=relevance`));
  }

  await browser.close();
})();
