/**
 * Tabellen, die abgerufen werden dürfen
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

  // GET-Endpunkt zum Abrufen von der Datenbank
  app.get('/api/data/:table', (req, res) => {
    const tableName = req.params.table;
    // Überprüfen, ob die angegebene Tabelle existiert oder Zugriff erlaubt ist
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
};
