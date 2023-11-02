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

        const productNameElement = await page.$('.product-name');
        const productName = await page.evaluate((element) => element.textContent, productNameElement);

        const [splitName, category] = productName.split(',');
        const ProductName = splitName.trim();

        let deliveryDate = await page.$eval('[data-bs-content]', (element) => {
          const deliveryContent = element.getAttribute('data-bs-content');
          const match = deliveryContent.match(/\d+/); 
          return match ? parseInt(match[0], 10) : 0; 
        });

        const price = await page.$eval('.price', (element) => {
          const priceString = element.textContent.trim();
          return parseFloat(priceString.replace(/[^\d.,]+/g, '').replace('.', '').replace(',', '.'));
        });

        const productInfo = await page.$$eval('.d-block.details-www table tr', (elements) => {
          const productData = {};
          let Volt;
          let drehZahl;

          elements.forEach((element) => {
            const c1 = element.querySelector('td.c1')?.textContent.trim();
            const c2 = element.querySelector('td.c2')?.textContent.trim();
            const c4 = element.querySelector('td.c4')?.textContent.trim();

            if (c1 === 'Geeignete Sockel' || c1 === 'Typ' || c1 === 'Art') {
              productData[c1] = c4;
            }
            if (c1 === 'Spannungsbereich' || c2 === 'Eingangsspannung') {
              const number = c4.match(/\d+/);
              Volt = number ? parseInt(number[0]) : null;
            }
          
            if (c1 === 'Drehzahl' || c2 === 'Geschwindigkeiten') {
              const firstNumber = c4.match(/[\d.,]+/);
              drehZahl = firstNumber ? parseInt(firstNumber[0].replace(/[.,]/g, '')) : null;
            }
          });

          return { productData, Volt, drehZahl };
        });

        const productType = productInfo.productData['Typ'] || productInfo.productData['Art'];
        const Sockel = productInfo.productData['Geeignete Sockel'];
        const Preis = parseFloat(price).toFixed(2);

        console.log([
          productURL || '',
          ProductName || '',
          productType || '',
          Sockel || '',
          productInfo.drehZahl || '',
          productInfo.Volt || '',
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
  const url = 'https://www.alternate.de/configurator.xhtml?pca=20&pco=45&pcp=20&pcs=relevance';
  await page.goto(url);

  const productData = await page.$$eval('.col-12[data-kid]', (elements) => {
    return elements.map((element) => element.getAttribute('data-kid'));
  });

  const chunkSize = 5;
  for (let i = 0; i < productData.length; i += chunkSize) {
    const chunk = productData.slice(i, i + chunkSize);
    await scrapeProducts(chunk.map((pkid) => `https://www.alternate.de/configurator.xhtml?pca=20&pco=45&pkid=${pkid}&pcs=relevance`));
  }

  await browser.close();
})();
