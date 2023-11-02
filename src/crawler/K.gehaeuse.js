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
            const c4 = element.querySelector('td.c4')?.textContent.trim();

            if (c1 === 'Abmessungen') {
              productData[c1] = c4;
            }

            if (c1 === 'Mainboard Formfaktor') {
              productData['Mainboard Formfaktor'] = c4;
            }

            if (c1 === 'Frontanschlüsse') {
              productData['Frontanschlüsse'] = c4;
            }
            if (c1 === 'Gewicht') {
              productData['Gewicht'] = parseFloat(c4.replace(/[^\d.,]+/g, '').replace('.', '').replace(',', '.'));;
            }
          });

          return productData;
        });

        const productNameElement = await page.$('.product-name');
        const productName = await page.evaluate((element) => element.textContent, productNameElement);

        const [splitName, typ] = productName.split(',');
        const ProductName = splitName.trim();
        const Typ = typ ? typ.trim() : '';

        let deliveryDate = await page.$eval('[data-bs-content]', (element) => {
          const deliveryContent = element.getAttribute('data-bs-content');
          const match = deliveryContent.match(/\d+/); 
          return match ? parseInt(match[0], 10) : 0; 
        });

        if (!deliveryDate) {
          deliveryDate = await page.$eval('#collapse-details-1532120 > div > div > div > div > div:nth-child(3) > div:nth-child(3) > div > span > span', (element) => {
            const content = element.textContent;
            const match = content.match(/\d+/); 
            return match ? parseInt(match[0], 10) : 0; 
          });
        }

        const price = await page.$eval('.price', (element) => {
          const priceString = element.textContent.trim();
          return parseFloat(priceString.replace(/[^\d.,]+/g, '').replace('.', '').replace(',', '.'));
        });
        const Formfaktor =  productInfo['Mainboard Formfaktor'];
        const Frontanschlüsse = productInfo['Frontanschlüsse'];
        const Abmessungen = productInfo['Abmessungen'];
        const Preis = parseFloat(price).toFixed(2);
        const Gewicht = parseFloat(productInfo['Gewicht']).toFixed(2);

        console.log([
          productURL || '',
          ProductName || '',
          Typ || '',
          Formfaktor || '',
          Frontanschlüsse || '',
          Abmessungen || '',
          Preis || '',
          Gewicht || '',
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
  const url = 'https://www.alternate.de/configurator.xhtml?pca=20&pco=49&pcp=30&pcs=relevance';
  await page.goto(url);

  const productData = await page.$$eval('.col-12[data-kid]', (elements) => {
    return elements.map((element) => element.getAttribute('data-kid'));
  });

  const chunkSize = 5;
  for (let i = 0; i < productData.length; i += chunkSize) {
    const chunk = productData.slice(i, i + chunkSize);
    await scrapeProducts(chunk.map((pkid) => `https://www.alternate.de/configurator.xhtml?pca=20&pco=49&pkid=${pkid}&pcs=relevance`));
  }

  await browser.close();
})();
