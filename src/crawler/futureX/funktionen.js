const puppeteer = require('puppeteer');

async function futureXUrls(url, anzahlSeite) {
  let linkListe = [];
  const browser = await puppeteer.launch();
  let hatNachSeite = true;

  for(let i = 1; i <= anzahlSeite && hatNachSeite; i++){
    const page = await browser.newPage();
    await page.waitForTimeout(5000);

    try{ 
      await page.goto(url + i);
      const elements = await page.$$('.cms-block.pos-1.cms-block-product-listing .product-image-wrapper');
      for(let element of elements){
        const link = await page.evaluate(el => el.querySelector('a').getAttribute('href'), element)
        linkListe.push(link);
      }
    } catch (error) {
      hatNachSeite = false;
      console.error('Erreur de navigation :', error);
    } 
  }
  await browser.close();
  return linkListe;
}

async function futureXUrls2(url) {
  let linkListe = [];
  const browser = await puppeteer.launch();
  let hatnachSeite = true;
  let i = 1;

  while(hatnachSeite === true){
    const page = await browser.newPage();

    try{
      await page.goto(url + i);
      const elements = await page.$$('.cms-block.pos-1.cms-block-product-listing .product-image-wrapper');
      if(elements.length != 0 && i < 10){
        for(let element of elements){
          const link = await page.evaluate(el => el.querySelector('a').getAttribute('href'), element)
          linkListe.push(link);
        }
      }else{
        console.log('keine Seite mehr!');
        hatnachSeite = false;
      }
    } catch (error) {
      console.error('Error navigation :', error);
    } 
    console.log("Seitennumber: ", i);
    ++i;
  }
  await browser.close();
  console.log("Anzahl Seiten: ", i);
  return linkListe;
}

function extrahiereZahl(satz){
  const kerne = (satz.trim()).split(" "); 

  if(kerne.length != 0){
    return parseInt(kerne[0]);
  }else{
    kerne = 0;
    return kerne;
  }
}


function extrahiereDatum(satz){
  splitSatz = satz.split(','); 
  let lifertDatum =  0;

  if(satz.length > 0){
    lifertDatum =  parseInt(splitSatz[1].match(/\d+/)[0]);
    if(lifertDatum >= 1 && lifertDatum <=3){
      lifertDatum+= 1;
    }
  }

  return lifertDatum;
}

function gibVerfuegbarkeit(satz){
  let verfuegbarkeit = "";

  if(satz.length > 0){
    if(satz.includes('Lager')){
      verfuegbarkeit = satz.split(',')[0];
    }else if(satz.includes('Versandfertig')){
      verfuegbarkeit = satz.split(',')[0];
    }
  }
  return verfuegbarkeit.trim(); 
}

function extrahiereFloat2(data) {
  const parts = data.split(',');

  if(parts.length > 1){
    const parts2 = parts[1].split(' ');
    return parseFloat(parts[0] + "." + parts2[0]);
  }else if( parts.length <= 1){
    const parts2 = parts[0].split(' ');
    return parseFloat(parts2[0]);
  }
}

function isEmpty(variable) {
  return variable === undefined || variable === null || (typeof variable === 'string' && variable.trim() === '') 
                                || (Array.isArray(variable) && variable.length === 0);
}


function konvertiereInFloat(data){
  anzahlWortData = data.split(" ");
  if(anzahlWortData.length === 2){
    if(anzahlWortData[0].includes(',')){
      return parseFloat(anzahlWortData[0].replace(',', '.'));
    }else{
      return parseFloat(data);
    }
  }else{
    if(data.includes('€')){
      return parseFloat((data.replace('€', '').trim()).replace(',', '.'));
    }else{
      return data; 
    }
  }
}

function konvertiereInInt(data, zeichen){
  if(data.includes(zeichen)){
    return parseInt((data.replace(zeichen, "").trim()));
  }else{
    data = 0;
    return data;
  }
}

async function scrapeProduct(kategorie, artikel) {
    const containerFluid = await page.$('main > .container-main');
    const titleDiv = await containerFluid.$('.cms-element-product-name > h1');
    const priceDiv = await page.$('head > meta:nth-child(18)');
    const liferungDiv = await containerFluid.$('.product-detail-delivery-information p');
    const imgSelektor = await containerFluid.$('.img-fluid.gallery-slider-image.magnifier-image.js-magnifier-image');
    const markeSelektor = await page.$('head > meta:nth-child(17)');

    artikel.shopID = 2;
    artikel.kategorie = kategorie;
    artikel.bezeichnung = await titleDiv.evaluate(node => node.innerText);
    artikel.marke = await markeSelektor.evaluate(node => node.getAttribute('content'));
    const preis = await priceDiv.evaluate(node => node.getAttribute('content'));
    artikel.preis = parseFloat(preis);
    artikel.deliveryDate = extrahiereDatum(await liferungDiv.evaluate(node => node.innerText));
    artikel.produktlink = listVonUrlArtikel[i];
    artikel.imgUrl = await imgSelektor.evaluate(node => node.getAttribute('src'));
    artikel.verfuegbarkeit = gibVerfuegbarkeit(await liferungDiv.evaluate(node => node.innerText));
}



module.exports = {  
  extrahiereZahl,
  extrahiereDatum,
  extrahiereFloat2,
  futureXUrls,
  futureXUrls2,
  gibVerfuegbarkeit,
  isEmpty,
  konvertiereInFloat,
  konvertiereInInt,
  scrapeProduct
};
