const { scrapeComputerUniverseUrls } = require('./funktionen');
const { futureXUrls, futureXUrls2 } = require('./funktionen');



//console.log(scrapeComputerUniverseUrls("https://www.future-x.de/pc-geh%C3%A4use-c-17_24362_5345/?cPath=17_24362_5345&page=", 3));

async function main() {
    //const result = await futureXUrls2("https://www.future-x.de/Hardware-Netzwerk/PC-Komponenten/PC-Gehaeuse/?b2bListingView=listing&manufacturer=c0ee3adfafa3b9ea51d4485d36376e55%7Ce2de4de843c845729d39507a8b1b8bdc%7Cd774528a8a6776870c89827bf2cb4434%7C4e718612b35ed7c909b1a2e01dc5a5c8%7Cd42456f2e1a42e4c5f3fd480828389ee%7Cec9b1ff8498a79838e60ecdb9fae4841%7C156119e710147a989122d0742caac8cc%7C3fcc134d7e39162d018119753075c44b%7Cc576e180e53c4138ad6514dfc6945dbd%7C9ee7f8502bed374d35e01291ee8b63c1%7Cec2f9ebeeb2333ef09d397898ee6f341%7Cfc7771d5bff5a78b8261beb83e21c378%7C5632977e5c4ad3264e953c18638feb95%7C008098e5c5a40c9418f582a185d199ed%7Cda9eb510bade2d40d83b762c9e7da1ea&p=")
    const result = await futureXUrls2("https://www.future-x.de/Hardware-Netzwerk/PC-Komponenten/CPUs/?b2bListingView=listing&p=");
    console.log(result);
}
  
main();
