const puppeteer = require('puppeteer');
const { scrapeComputerUniverseUrls, testFunction } = require('./funktionen');
//import { testFunction } from './funktionen.js'

/*const urls = [
  '/de/p/90801699', '/de/p/90801129',
  '/de/p/90906666', '/de/p/90836384',
  '/de/p/90915100', '/de/p/90915097',
  '/de/p/90912815', '/de/p/90912814',
  '/de/p/90911612', '/de/p/90911606',
  '/de/p/90910945', '/de/p/90910943',
  '/de/p/90909032', '/de/p/90860749',
  '/de/p/90849229', '/de/p/90817877',
  '/de/p/90912816', '/de/p/90860747',
  '/de/p/90849233', '/de/p/90849193'
];*/

const urls = [
  '/de/p/90801699', '/de/p/90801129',
  '/de/p/90906666', '/de/p/90836384',
  '/de/p/90915100', '/de/p/90915097',
  '/de/p/90912815', '/de/p/90912814',
  '/de/p/90911612', '/de/p/90911606',
  '/de/p/90910945', '/de/p/90910943',
  '/de/p/90909032', '/de/p/90860749',
  '/de/p/90849229', '/de/p/90817877',
  '/de/p/90912816', '/de/p/90860747',
  '/de/p/90849233', '/de/p/90849193'
];

//Liste von Url für jeden Artikel
let listVonUrlArtikel = [];

//for(let i = 0; i < urls.length; i++){

  (async () => {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: false });
    const page = await browser.newPage();
    await page.waitForTimeout(20000);
  
    await page.goto("https://www.future-x.de/crucial-speichermodul-16-gb-ram-speicher-ddr4-2400-mhz-12v-260-pin-so-dimm-p-277155/");
    await page.waitForTimeout(10000);
  
    // Utilisez page.$$eval pour extraire toutes les données
    const elements = await page.$$('#technicalDetails td:nth-child(2)');
  
    for(let element of elements){
      const data = await page.evaluate(el => el.textContent, element)
      console.log(data);
      listVonUrlArtikel.push(data);
    }
    /*
    for(const url of urls){
      console.log('https://www.computeruniverse.net' + url);
    }
    */
    console.log(listVonUrlArtikel);
    //await browser.close();
  })();

//}
