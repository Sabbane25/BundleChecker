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
            const c1 = element.querySelector('td.c1')?.textContent;
            const c2 = element.querySelector('td.c2')?.textContent;
            const c4 = element.querySelector('td.c4')?.textContent;

            if (c1 === 'Sockel' || c1 === 'Chipsatz') {
              productData[c1] = c4;
            }
            if (c2 === 'unterstützter Speichertyp') {
              productData[c2] = c4;
            }
            if (c2 === 'Anzahl der Sockel' || c2 === 'maximal') {
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
        const Sockel = productInfo['Sockel'];
        const Chipsatz = productInfo['Chipsatz'];
        const Anzahl = productInfo['Anzahl der Sockel'];
        const Maximal = productInfo['maximal'];
        const Preis = parseFloat(price).toFixed(2);
        const Speicher = productInfo['unterstützter Speichertyp'];

        console.log([
          productURL || '',
          ProductName || '',
          Category || '',
          Sockel || '',
          Chipsatz || '',
          Anzahl || '',
          Maximal || '',
          Speicher || '',
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
  const url = 'https://www.alternate.de/configurator.xhtml?pca=20&pco=43&pcp=15&pcs=relevance';
  await page.goto(url);

  const productData = await page.$$eval('.col-12[data-kid]', (elements) => {
    return elements.map((element) => element.getAttribute('data-kid'));
  });

  const chunkSize = 5;
  for (let i = 0; i < productData.length; i += chunkSize) {
    const chunk = productData.slice(i, i + chunkSize);
    await scrapeProducts(
      chunk.map((pkid) => `https://www.alternate.de/configurator.xhtml?pca=20&pco=43&pkid=${pkid}&pcs=relevance`)
    );
  }

  await browser.close();
})();
