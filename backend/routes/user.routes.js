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
        console.error('Fehler beim LÃ¶schen des Benutzers: ' + err.message);
        res.status(500).send('Interner Serverfehler');
        return;
      }

      console.log('Benutzer erfolgreich gelÃ¶scht.');
      res.setHeader('Content-Type', 'application/json');
      res.status(200).end('Benutzer erfolgreich gelÃ¶scht.');
    });
  });

  app.post('/addUser', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'E-Mail und Passwort sind erforderlich' });
    }

    const sql = 'INSERT INTO Nutzer (Email, Passwort) VALUES (?, ?)';
    connection.query(sql, [email, password], (err, results) => {
      if (err) {
        console.error('Fehler beim AusfÃ¼hren der Datenbankabfrage: ' + err.message);
        return res.status(500).json({ message: 'Fehler beim HinzufÃ¼gen des Benutzers' });
      } else {
        res.status(201).json({ message: 'Benutzer erfolgreich hinzugefÃ¼gt' });
      }
    });
  });

  app.get('/Emails', (req, res) => {

    const query = `SELECT Email FROM Nutzer`;
    connection.query(query, (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });
};
