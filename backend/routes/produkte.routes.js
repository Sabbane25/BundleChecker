module.exports = function(app, connection) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //GET-Endpunk zum Abrufen von Produkten (Arnauld)
  app.get('/Produkte/:table', (req, res) => {
    const tableName = req.params.table;
    const query = `SELECT * FROM ${tableName}`;

    connection.query(query, (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });

  // Get-Endpunk, um eine Liste alle Kategorien zu erhalten(Arnauld)
  app.get('/alleProdukte', (req, res) => {
    const query = `SELECT * FROM Artikel`;

    connection.query(query, (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });
};
