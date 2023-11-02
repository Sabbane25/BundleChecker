const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();

  async function scrapeProducts(productURL, productURLs) {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(10000);

    try {
      for (const productURL of productURLs) {
        await page.goto(productURL, { waitUntil: 'domcontentloaded' });
        await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

        const productInfo = await page.$$eval('.d-block.details-www table tr', (elements) => {
          const productData = {};

          elements.forEach((element) => {
            const c1 = element.querySelector('td.c1')?.textContent.trim();
            const c2 = element.querySelector('td.c2')?.textContent.trim();
            const c4 = element.querySelector('td.c4')?.textContent.trim();

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

        const productNameElement = await page.$('.product-name');
        const productName = await page.evaluate((element) => element.textContent, productNameElement);

        const [splitName, category] = productName.split(',');
        const ProductName = splitName.trim();

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

        const Kapazitaet = productInfo['Kapazität'];
        const Typ = productInfo['Typ'];
        const Preis = parseFloat(price).toFixed(2);
        const lesen = productInfo['Lesen'];
        const schreiben = productInfo['Schreiben'];

        console.log([
          productURL || '',
          ProductName || '',
          Kapazitaet || '',
          Typ || '',
          Preis || '',
          deliveryDate || '',
          lesen || 0,
          schreiben || 0,
        ]);
      }
    } catch (error) {
      console.error(`Error scraping product ID ${productURL}: ${error.message}`);
    } finally {
      await page.close();
    }
  }

  const urls = [
    'https://www.alternate.de/configurator.xhtml?pca=20&pco=69&pcp=20&pcs=relevance',
    'https://www.alternate.de/configurator.xhtml?pca=20&pco=71&pcp=6&pcs=relevance',
  ];

  for (const url of urls) {
    const page = await browser.newPage();
    await page.goto(url);

    const productData = await page.$$eval('.col-12[data-kid]', (elements) => {
      return elements.map((element) => element.getAttribute('data-kid'));
    });

    const chunkSize = 5;
    for (let i = 0; i < productData.length; i += chunkSize) {
      const chunk = productData.slice(i, i + chunkSize);
      const pkidURLs = chunk.map((pkid) => `${url}&pkid=${pkid}&pcs=relevance`);
      await scrapeProducts(url, pkidURLs);
    }
  }

  await browser.close();
})();
