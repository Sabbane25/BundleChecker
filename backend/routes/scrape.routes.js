/**
 * Scraping FutureX
 * Arnauld Mba Kuitche
 *
 * @param app
 * @param connection
 */
module.exports = function(app, connection) {
  const { insertArtikel } = require('./../scrapingFutureX'); // Importieren des Scraping-FutureX
  const { insertDataIntoArtikel2, insertDataIntoCPU2, insertDataIntoRAM2, insertDataIntoGehaeuse2,insertDataIntoGrafikkarte2,
    insertDataIntoFestplatte2, insertDataIntoMainboard2, insertDataIntoNetzteil2, insertDataIntoKomponenten } = require('../scrapingAlternate'); // Importieren des Scraping-Alternate

  app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Crawler FutureX
  app.post('/api/scrapedata', (req, res) => {
    const scrapedData = req.body;

    updateDataInArtikel(connection, scrapedData.value);
    insertArtikel(connection, scrapedData);

    res.status(200).send('Daten erfolgreich empfangen');
  });

  // Crawler Alternate
  app.post('/api/scrapedata2', (req, res) => {
    const scrapedData = req.body;
    insertDataIntoArtikel2(connection, scrapedData);
    insertDataIntoKomponenten(connection, scrapedData);

    res.status(200).send('Daten erfolgreich empfangen');
  });
};
