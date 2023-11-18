const {verifySignUp} = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app, connection) {
  app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //GET-Endpunk zum Abrufen von Produkten (Arnauld)
  app.get('/getUsers', (req, res) => {
    console.log('Empfangene Anfrage-Methode:', req.method); // Logge die empfangene HTTP-Methode

    const query = `SELECT n.email, n.password, n.id
                   FROM nutzer n
                          JOIN nutzer_nutzer_rollen_join nr ON n.id = nr.user_id
                   WHERE nr.role_id = 1`;

    connection.query(query, (err, results) => {
      if (err) {
        console.error('Fehler beim Abrufen der Nutzerdaten: ' + err);
        res.status(500).json({ error: 'Fehler beim Abrufen der Nutzerdaten' });
        return;
      }
      res.json(results);
    });
  });

  app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    const sql = 'DELETE FROM nutzer WHERE id = ?';

    connection.query(sql, [userId], (err, result) => {
      if (err) {
        console.error('Fehler beim Löschen des Benutzers: ' + err.message);
        res.status(500).send('Interner Serverfehler');
        return;
      }

      console.log('Benutzer erfolgreich gelöscht.');
      res.setHeader('Content-Type', 'application/json');
      res.status(200).end('Benutzer erfolgreich gelöscht.');
    });
  });


  app.post(
      '/addUser',
      [
        verifySignUp.checkDuplicateEmail,
        verifySignUp.checkRolesExisted
      ],
      controller.signup
  )
};
