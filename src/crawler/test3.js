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
  console.log(`Product ID: ${productURL}`);
        console.log([
          productURL || '',
          ProductName || '',
          Category || '',
          ShopID,
          productInfo['Sockel'] || '',
          parseInt(anzahl) || '',
          parseInt(threads) || '',
          productInfo['Taktfrequenz'] || '',
          productInfo['GPU'] || '',
          productInfo['Stromverbrauch (TDP)'] || '',
          parseFloat(price).toFixed(2) || '',
          deliveryDate || '',
        ]);