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

        const productName = await page.$eval('.product-name', (element) => element.textContent);
        const [splitName, category] = productName.split(',');
        const ProductName = splitName.trim();
        const Category = category ? category.trim() : '';

        const productInfo = await page.$$eval('.d-block.details-www table tr', (elements) => {
          const productData = {};

          elements.forEach((element) => {
            const c2 = element.querySelector('td.c2')?.textContent.trim();
            const c1 = element.querySelector('td.c1')?.textContent.trim();
            const c4 = element.querySelector('td.c4')?.textContent.trim();

            if (c1 === 'Typ') {
              productData[c1] = c4;
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

        const productType = productInfo['Typ'] || productInfo['Art'];
        const vKapazitaet = productInfo['Kapazität'];
        const CL = productInfo['CAS Latency (CL)'];
        const Preis = parseFloat(price).toFixed(2);
        console.log([
          productURL || '',
          ProductName || '',
          Category || '',
          productType || '',
          vKapazitaet || '',
          CL || '',
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
  const url = 'https://www.alternate.de/configurator.xhtml?pca=20&pco=46&pcp=50&pcs=relevance';
  await page.goto(url);

  const productData = await page.$$eval('.col-12[data-kid]', (elements) => {
    return elements.map((element) => element.getAttribute('data-kid'));
  });

  const chunkSize = 5;
  for (let i = 0; i < productData.length; i += chunkSize) {
    const chunk = productData.slice(i, i + chunkSize);
    await scrapeProducts(chunk.map((pkid) => `https://www.alternate.de/configurator.xhtml?pca=20&pco=46&pkid=${pkid}&pcs=relevance`));
  }

  await browser.close();
})();
