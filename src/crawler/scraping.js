const puppeteer = require('puppeteer');
import { Browser } from 'puppeteer'

const url = 'https://www.notebooksbilliger.de/'

const main = async() =>{
    const browser: Browser = await puppeteer.launch({ headers: "false"});
    const page = await browser.newPage();
    await page.goto(url)

    const bookData = await page.evaluate((url) => {
        // const bookPods = Array.from(document.querySelectorAll('a'))
        const elements = document.querySelectorAll('#tle-configurator-components\\:components\\:0\\:component-form\\:tle-configurator-listing\\:listingItems');

        // const data = elements.map((book: any) => ({
        //     title: book.querySelector('h3 a').getAttribute('title'),
        //     imgSrc: url + book.querySelector('img').getAttribute('src'), 
        //     rating: book.querySelector('.star-rating').classList[1],
        // }))
        return elements 
        
    }, url)
    
    console.log(bookData);
    
    await browser.close()
}

main()