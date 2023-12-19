/**
 * Route-Datei für die Artikel
 *
 * Diese Datei enthält alle Routen für die Artikel.
 *
 * @autor Mokhtar Yosofzay
 * @autor Arnauld Mba Kuitche
 *
 * @param app
 * @param connection
 */
module.exports = function(app, connection) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Get-Endpunk, um eine Liste von aller Artikel zu erhalten(Arnauld)
  app.get('/Artikel/:artikel', (req, res) => {
    const tableArtikel = req.params.artikel;
    const query2 = `SELECT A.*, T.* FROM Artikel A, ${tableArtikel} T WHERE A.Url = T.Url`

    const query =`
        SELECT *
        FROM ${tableArtikel}
        JOIN Artikel ON ${tableArtikel}.Url = Artikel.ProduktUrl
        WHERE ShopID = 2
        LIMIT 10`;

    connection.query(query, (error, results) => {
      if (error){
        console.error('Erreur lors de l\'execution de la requete :', error);
        res.status(500).json({ error: 'Erreur lors de la rÃ©cupÃ©ration des donnÃ©es' });
      } else {
        res.json(results);
      }
    });
  });

  app.get('/Artikel2/:artikel', (req, res) => {
    const tableArtikel = req.params.artikel;
    const shopId = req.query.shopId || 2;

    const query = `
      SELECT *
      FROM ${tableArtikel}
             JOIN Artikel ON ${tableArtikel}.Url = Artikel.ProduktUrl
      WHERE ShopID = ?`;

    connection.query(query, [shopId], (error, results) => {
      if (error){
        console.error('Erreur lors de l\'execution de la requete :', error);
        res.status(500).json({ error: 'Erreur lors de la rÃ©cupÃ©ration des donnÃ©es' });
      } else {
        res.json(results);
      }
    });
  });

  // um Eigenschaften jeder Artikel zu bekommen.
  app.get('/eigenschaften/:table/:marke', (req, res) => {
    const tableName = req.params.table;
    const markeValue = req.params.marke; 

    const query = `
    SELECT DISTINCT ${tableName}.${markeValue}
    FROM ${tableName}
    JOIN Artikel ON ${tableName}.url = Artikel.produktUrl`; 

    connection.query(query, [markeValue], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Erreur interne du serveur lors de l\'exÃ©cution de la requÃªte SQL.' });
      }
      res.json(results);
    });
  });

  // gib eine Liste von aller Marke einer Kategorie zurueck
  app.get('/marke/:table', (req, res) => {
    const tableName = req.params.table;
    const query2 = `SELECT * FROM ${tableName}`;

    const query = `
      SELECT DISTINCT Artikel.marke
      FROM ${tableName}
      JOIN Artikel ON ${tableName}.url = Artikel.produktUrl`;

    connection.query(query, (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });
};
