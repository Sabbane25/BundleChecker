
const puppeteer = require('puppeteer');
import { test } from './funktionen';



(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let url = 'https://www.alternate.de/configurator.xhtml?pca=20&pco=44&pcs=relevance';
  const buttonSelektor = '#tle-configurator-components\\:components\\:0\\:component-form\\:tle-configurator-listing\\:load-more-products-btn';



})();