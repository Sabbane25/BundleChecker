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
    const query = `SELECT A.*, T.* FROM Artikel A, ${tableArtikel} T WHERE A.ProduktUrl = T.Url`

    connection.query(query, (error, results) => {
      if (error){
        console.error('Erreur lors de l\'execution de la requete :', error);
        res.status(500).json({ error: 'Erreur lors de la rÃ©cupÃ©ration des donnÃ©es' });
      } else {
        res.json(results);
      }
    });
  });
};
