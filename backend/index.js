
const express = require('express'); // Importieren des Express-Frameworks
const cors = require('cors'); // Importieren des cors-Pakets

const app = express(); // Initialisieren der Express-App
const port = process.env.PORT || 3000; // Port, auf dem der Server laufen wird

// var corsOptions = {
//   origin: "http://localhost:4200"
// };

// app.use(cors(corsOptions));
app.use(cors());

// Parse Anfragen mit Content-Type - application/json
app.use(express.json());

// Parse Anfragen mit Content-Type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
})

// Datenbank
const db = require("./models");
const Role = db.role;

db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Backend läuft." });
});


// ToDo: Verwende gleiche Logik, wie für Registrierung statt direkten Datenbankzugriff
const mysql = require('mysql2'); // Importieren des MySQL2-Pakets
const connection = mysql.createConnection({
  host: '127.0.0.1',     // Hostname der Datenbank
  user: 'tim', // Benutzername
  password: '201922255', // Passwort
  database: 'BundleChecker' // Datenbankname
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
  } else {
    console.log('Connected to the database');
  }
});

require('./routes/auth.routes')(app);
require('./routes/artikel.routes')(app, connection);
require('./routes/kategorie.routes')(app, connection);
require('./routes/produkte.routes')(app, connection);
require('./routes/table.routes')(app, connection);
require('./routes/email.routes')(app, connection);
// require('./routes/user.routes')(app);
 
app.delete('/userLoeschen/:user_id', (req, res) => {
  const id = req.params.id; // Nehmen Sie die E-Mail-Adresse des zu löschenden Benutzers aus der Anfrage (Stellen Sie sicher, dass die Anfrage dies enthält)

  const query = `DELETE FROM nutzer WHERE user_id = ${id} `;
  
  console.log(user_id);

  connection.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('Fehler beim Löschen des Nutzers: ' + err.message);
      res.status(500).json({ error: 'Fehler beim Löschen des Nutzers' }); // Senden Sie eine Fehlerantwort zurück
    } else {
      console.log('Nutzer wurde erfolgreich gelöscht.');
      res.status(200).json({ message: 'Nutzer wurde erfolgreich gelöscht' }); // Senden Sie eine Erfolgsantwort zurück
    }
  });
});

app.get('/searchUser', (req, res) => {
  const query = `SELECT email FROM nutzer WHERE email = `
})
app.get('/getUsers', (req, res) => {
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

app.post('/addUser', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log('E-Mail und/oder Passwort fehlen.');
    return res.status(400).json({ message: 'E-Mail und Passwort sind erforderlich' });
  }

  let sqlCheckMail = `SELECT * FROM Nutzer WHERE Email = "${email}"`;
  connection.query(sqlCheckMail, (error, results, fields) => {
    if (error) {
      // Fehlermeldung bei Fehler
      res.status(500).send({
        state: true,
        success: false,
        message: error.message,
        code: 1697580279
      });
      console.log('Datenbank fehler');
    }

    if (results.length > 0) {
      // E-Mail Adresse bereits vorhanden
      res.status(200).send({
        state: true,
        success: false,
        message: "E-Mail Adresse bereits vorhanden.",
        code: 1697580307
      });
      console.log('E-Mail bereits vorhanden.');
    } else {
      const sql = 'INSERT INTO Nutzer (Email, Passwort) VALUES (?, ?)';
      connection.query(sql, [email, password], (err, results) => {
        if (err) {
          console.error('Fehler beim Ausführen der Datenbankabfrage: ' + err.message);
          res.status(500).send({
            state: true,
            success: false,
            message: "Fehler beim Hinzufügen des Benutzers",
            code: 1697580312
          });
          console.log('fehler beim hinzufügen');
        } else {
          res.status(200).send({
            state: true,
            success: true,
            message: "Benutzer erfolgreich hinzugefügt",
            code: 1697580318
          });
          console.log('hinzugefügt');
        }
      });
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


// Server starten und auf Anfragen lauschen
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
