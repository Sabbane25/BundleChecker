const puppeteer = require('puppeteer');
//permet de charger et donner tous les Articles de la page grace au clic sur le button
async function ladedieganzeSeite(url, buttonSelektor, page) {
    let i = 0; 
    let gibNaechsteSeite = true;
  
    while (gibNaechsteSeite) {

      await page.goto(url);
  
      try {
        // Attendez que le bouton soit présent pendant 1 seconde
        await page.waitForSelector(buttonSelektor, { timeout: 1000 });
  
        if (await page.$(buttonSelektor) !== null) {
          // Cliquez sur le bouton
          await page.click(buttonSelektor);
          await page.waitForTimeout(3000);
          url = page.url();
        } else {
          gibNaechsteSeite = false;
          console.log('Programme terminé');
        }
      } catch (error) {
        // Si le bouton n'est plus présent, sortez de la boucle
        gibNaechsteSeite = false;
        console.log('Programme terminé en raison de l\'absence du bouton');
      }
      console.log(url);
    }
    return url;
}