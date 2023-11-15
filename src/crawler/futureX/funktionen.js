const { Gehaeuse } = require('./models.js')
const puppeteer = require('puppeteer');

async function scrapeComputerUniverseUrls(url, anzahlSeite) {
  let linkListe = [];
  const browser = await puppeteer.launch();

  for(let i = 1; i <= anzahlSeite; i++){

    const page = await browser.newPage();
    await page.waitForTimeout(10000);
  
    await page.goto(url + i);

    const elements = await page.$$('.row.productRow.product_box.list-box');

    for(let element of elements){
        const link = await page.evaluate(el => el.querySelector('.col-12.col-md-6.productText').querySelector('a').getAttribute('href'), element)
        linkListe.push(link);
    }
  }
  //console.log(linkListe.length);
  await browser.close();
  return linkListe;
}

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
  let hatNachSeite = true;
  let i = 1;

  while(hatNachSeite === true){
    const page = await browser.newPage();
    await page.waitForTimeout(5000);

    try{
      await page.goto(url + i);
      const elements = await page.$$('.cms-block.pos-1.cms-block-product-listing .product-image-wrapper');
      if(elements.length != 0){
        for(let element of elements){
          const link = await page.evaluate(el => el.querySelector('a').getAttribute('href'), element)
          //console.log(link, "page number: ", i);
          linkListe.push(link);
        }
      }else{
        console.log('keine seite mehr!');
        hatNachSeite = false;
      }
    } catch (error) {
      console.error('Error navigation :', error);
    } 
    i++;
  }
  await browser.close();
  console.log("Anzahl Seiten: ", i);
  return linkListe;
}

function filterKomponente(satz, wort) {
  const komponenten = satz.split(" "); 
  for (const komponent of komponenten) {
    if (komponent === wort) {
      return komponent; 
    }
  }
  return null; 
}


function extrahiereZahl(satz){
  const kerne = satz.split(" "); 

  if(kerne.length != 0){
    return parseInt(kerne[0]);
  }else{
    kerne = " ";
    return kerne;
  }
}

function extrahiereDatum(lieferDatum){
  return parseInt(lieferDatum.match(/\d+/)[0]);
}


function extrahiereCharakter(satz){
  const charakter = satz.replace(/\d+/g, "").trim(); 
  if (charakter.length > 0) {
    return charakter; 
  } else {
    charakter = "null";
    return charakter;
  }
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

function extrahiereFloat(data) {

  if(data != " "){
    return parseFloat(data.replace(/[^\d.,]+/g, '').replace('.', '').replace(',', '.'));
  }
}

function isEmpty(variable) {
  return variable === undefined || variable === null || (typeof variable === 'string' && variable.trim() === '') 
                                || (Array.isArray(variable) && variable.length === 0);
}

function isNotEmpty(variable) {
  return variable !== undefined && variable !== null && ((typeof variable !== 'string') || variable.trim() !== '') 
                                                              && (!Array.isArray(variable) || variable.length !== 0);
}


function gibGehaeuseListe(merkmalListe, artikelObjekt, data, merkmal){
  if(data){
    if(merkmalListe.includes(filterKomponente(merkmal, "Motherboards"))){
        artikelObjekt.mainboardFormfaktor = data;
    }else if(merkmalListe.includes(filterKomponente(merkmal, "Anschlüsse"))){
        artikelObjekt.frontanschluesse = data;
    }else if(merkmalListe.includes(filterKomponente(merkmal, "Gewicht"))){
        if(isEmpty(artikelObjekt.gewicht)){
            artikelObjekt.gewicht = data;
        }
    }else if(merkmalListe.includes(filterKomponente(merkmal, "Formfaktor"))){
        if(isEmpty(artikelObjekt.produkttyp)){
            artikelObjekt.produkttyp = data;
        }
    }else if(merkmalListe.includes(filterKomponente(merkmal, "Breite"))){
            artikelObjekt.breite = data;
    }else if(merkmalListe.includes(filterKomponente(merkmal, "Tiefe"))){
        artikelObjekt.tiefe = data;
    }else if(merkmalListe.includes(filterKomponente(merkmal, "Höhe"))){
        artikelObjekt.hoehe = data;
    }
  }
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

function konvertiereInFloat2(data, zeichen){
  anzahlWortData = data.split(" ");
  if(data.includes(zeichen)){
    return parseFloat((data.replace(zeichen, "").trim()).replace(",", "."));
  }else{
    return data;
  }
}

function konvertiereInInt(data, zeichen){
  anzahlWortData = data.split(" ");
  if(data.includes(zeichen)){
    return parseInt((data.replace(zeichen, "").trim()));
  }else{
    data = 0;
    return data;
  }
}
const dataTest ="123 $";
//console.log(konvertiereInInt(dataTest, "$"));

module.exports = {
  scrapeComputerUniverseUrls,
  filterKomponente,
  futureXUrls,
  extrahiereFloat,
  extrahiereFloat2,
  extrahiereZahl,
  isEmpty,
  isNotEmpty,
  extrahiereDatum,
  gibGehaeuseListe,
  futureXUrls2,
  konvertiereInFloat,
  konvertiereInFloat2,
  konvertiereInInt
};
