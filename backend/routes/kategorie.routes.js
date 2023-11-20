module.exports = function(app, connection) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Get-Endpunk, um eine Liste alle Kategorien zu erhalten(Arnauld)
  app.get('/Kategorie', (req, res) => {

    const query = `SELECT DISTINCT kategorie FROM Artikel`;
    connection.query(query, (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });
};
