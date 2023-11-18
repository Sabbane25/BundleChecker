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

  app.post('/api/scrapedata', (req, res) => {

    const scrapedData = req.body;

    insertArtikel(connection, scrapedData);

    res.status(200).send('DonnÃ©es reÃ§ues avec succÃ¨s');
  });

  app.post('/api/scrapedata2', (req, res) => {

    const scrapedData = req.body;

    insertDataIntoArtikel2(connection, scrapedData);
    insertDataIntoKomponenten(connection, scrapedData);

    res.status(200).send('DonnÃ©es reÃ§ues avec succÃ¨s');
  });

  // GET-Endpunkt zum Abrufen von der Datenbank
  app.get('/api/data/:table', (req, res) => {
    const tableName = req.params.table;
    // ÃœberprÃ¼fen, ob die angegebene Tabelle existiert oder Zugriff erlaubt ist
    if (allowedTables.includes(tableName)) {
      const query = `SELECT * FROM ${tableName}`; //Ruft die im Link angegebene Tabelle auf
      connection.query(query, (err, results) => {
        if (err) {
          console.error('Error executing query: ', err);
          res.status(500).json({ error: 'An error occurred' });
        } else {
          res.json(results);
        }
      });
    } else {
      res.status(400).json({ error: 'Invalid table name' }); //Falls der  Tabellename falsch ist
    }
  });

  app.get('/Emails', (req, res) => {

    const query = `SELECT Email FROM Nutzer`;
    connection.query(query, (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });
};
