const { scrapeComputerUniverseUrls } = require('./funktionen');

//console.log(scrapeComputerUniverseUrls("https://www.future-x.de/pc-geh%C3%A4use-c-17_24362_5345/?cPath=17_24362_5345&page=", 3));

async function main() {
    const result = await scrapeComputerUniverseUrls("https://www.future-x.de/pc-geh%C3%A4use-c-17_24362_5345/?cPath=17_24362_5345&page=", 3)
    console.log(result);
}
  
main();
