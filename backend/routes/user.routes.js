const {verifySignUp} = require("../middleware");
const controller = require("../controllers/auth.controller");

/**
 * Nutzer Schnittstellen
 *
 * @autor Arnauld Mba Kuitche
 * @author Mokhtar Yosofzay
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

  app.put('/changePassword', (req, res) => {
    const { id, password } = req.body;
    const sql = `UPDATE nutzer SET password = ? WHERE id = ?`;

    const hashedPassword = bcrypt.hashSync(password, 8);
  
    connection.query(sql, [hashedPassword, id], (err, results) => {
      if (err) {
        console.error('Fehler beim Ausführen der Datenbankabfrage: ' + err.message);
        return res.status(500).json({ message: 'Fehler beim Ändern des Passworts' });
      } else {
        res.status(201).json({ message: 'Passwort erfolgreich geändert' });
      }
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
