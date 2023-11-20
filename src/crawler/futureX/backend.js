
const express = require('express'); // Importieren des Express-Frameworks
const mysql = require('mysql2'); // Importieren des MySQL2-Pakets
const cors = require('cors'); // Importieren des cors-Pakets
const app = express(); // Initialisieren einer Express-App
const port = 3000; // Wählen Sie den gewünschten Port, auf dem der Server laufen wird

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
    return res.status(400).json({ message: 'E-Mail und Passwort sind erforderlich' });
  }

  const sql = 'INSERT INTO Nutzer (Email, Passwort) VALUES (?, ?)';
  connection.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Fehler beim Ausführen der Datenbankabfrage: ' + err.message);
      return res.status(500).json({ message: 'Fehler beim Hinzufügen des Benutzers' });
    } else {
      res.status(201).json({ message: 'Benutzer erfolgreich hinzugefügt' });
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
/**
// Route für das Erstellen eines neuen Benutzers
app.post('/register', async (req, res) => {
    const { Name, Vorname, Email, Passwort } = req.body;

    // Serverseitige Validierung
    if (!Name || !Vorname || !Email || !Passwort) {
        return res.status(400).json({ error: 'Bitte füllen Sie alle Felder aus.' });
    }

    // Überprüfen, ob die E-Mail-Adresse bereits in der Datenbank vorhanden ist
    const query = `SELECT * FROM Nutzer WHERE Email = ?`;
    connection.query(query, [Email], (err, results) => {
        if (err) {
            console.error('Datenbankabfragefehler: ' + err.stack);
            res.status(500).json({ error: 'Datenbankabfragefehler' });
            return;
        }

        if (results.length > 0) {
            return res.status(400).json({ error: 'Die E-Mail-Adresse wird bereits verwendet.' });
        }

        // Passwort sicher hashen
        bcrypt.hash(password, saltRounds, (hashErr, hashedPassword) => {
            if (hashErr) {
                console.error('Fehler beim Hashen des Passworts: ' + hashErr.stack);
                res.status(500).json({ error: 'Fehler beim Hashen des Passworts' });
                return;
            }

            // Daten in die Datenbank einfügen
            const user = {
                Name,
                Vorname,
                Email,
                Passwort: hashedPassword
            };

            connection.query('INSERT INTO Nutzer SET ?', user, (insertErr, results) => {
                if (insertErr) {
                    console.error('Fehler beim Einfügen des Benutzers in die Datenbank: ' + insertErr.stack);
                    res.status(500).json({ error: 'Fehler beim Einfügen des Benutzers in die Datenbank' });
                    return;
                }
                // Erfolgreich eingefügt, hier können Sie eine Bestätigungsnachricht senden oder andere Aktionen ausführen
                res.status(200).json({ success: 'Benutzer wurde erfolgreich registriert.' });
            });
        });
    });
});*/
//Verwendung des cors-Pakets
app.use(cors());

// Middleware für JSON-Verarbeitung
app.use(express.json()); // Diese Middleware erlaubt das Verarbeiten von JSON-Daten in Anfragen

// Get-Endpunk, um eine Liste von aller Artikel zu erhalten(Arnauld)
app.get('/Artikel/:artikel', (req, res) => {
        const tableArtikel = req.params.artikel;
        const query = `SELECT A.*, T.* FROM Artikel A, ${tableArtikel} T WHERE A.Artikelnummer = T.Artikelnummer`

        connection.query(query, (error, results) => {
                if (error){
			console.error('Erreur lors de l\'execution de la requete :', error);
			res.status(500).json({ error: 'Erreur lors de la récupération des données' });
		} else {
                	res.json(results);
		}
        });
});

// Get-Endpunk, um eine Liste alle Kategorien zu erhalten(Arnauld)
app.get('/Kategorie', (req, res) => {

	const query = `SELECT DISTINCT kategorie FROM Artikel`;
	connection.query(query, (error, results) => {
		if (error) throw error;
        	res.json(results);
	});
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

app.post('/api/scrapedata', (req, res) => {
  const scrapedData = req.body; 
  //Insertion in Artikel
  for(const data of scrapedData){
    const sqlArtikel = `INSERT INTO Artikel(Kategorie, Preis, ShopID, ProduktUrl, Bezeichnung, LieferDatum)
                        VALUES (?, ?, ?, ?, ?, ?)
                        ON DUPLICATE KEY UPDATE Preis = VALUES(Preis),LieferDatum = VALUES(LieferDatum)`;

    const valuesArtikel = [
        data.kategorie,
        data.preis,
        data.shopID,
        data.produktlink,
        data.bezeichnung,
        data.deliveryDate, 
    ];

    connection.query(sqlArtikel, valuesArtikel, (error, results) => {
        if (error) throw error;
        console.log('Objet inséré avec succès, ID:', results.insertId);
    });
  }

  //Insertion in CUP
  for(const data of scrapedData){
    let sqlUrl = `SELECT * FROM CPU WHERE Url = "${data.produktlink}"`;
  
    connection.query(sqlUrl, (error, results, fields) => {
      if (error) {
        res.status(500).send({
          state: true,
          success: false,
          message: error.message,
          code: 1697580279
        });
        console.log('Datenbank fehler');
      }
      if (results.length > 0) {
        res.status(200).send({
          state: true,
          success: false,
          message: "Url bereits vorhanden.",
          code: 1697580307
        });
        console.log('Url bereits vorhanden.');
      }else{
        console.log("l insertion est possible ****");

        const sql = `INSERT INTO CPU (Artikelnummer, Url, Sockel, AnzahlKerne, Stromverbrauch, Taktfrequenz, InterneGrafik, Threads)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        const valuesCpu = [
            null,
            data.produktlink,
            data.sockel,
            data.kerne,
            data.stromverbrauch,
            data.taktfrequenz,
            data.interneGrafik,
            data.threads
        ];
        
        connection.query(sql, valuesCpu, (err, results) => {
          if (err) {
          console.error('Fehler beim Ausführen der Datenbankabfrage: ' + err.message);
          res.status(500).send({
              state: true,
              success: false,
              message: "Fehler beim Hinzufügen des CPU",
              code: 1697580312
          });
          console.log('fehler beim hinzufügen');
          } else {
          res.status(200).send({
              state: true,
              success: true,
              message: "CPU erfolgreich hinzugefügt",
              code: 1697580318
          });
          console.log('hinzugefügt');
          }
        });
      }

    });
  }

  // Répondez au frontend pour indiquer que les données ont été reçues avec succès
  res.status(200).send('Données reçues avec succès');
  connection.end(); 
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

process.on('SIGINT', () => {
  connection.end((err) => {
    if (err) console.error('Error closing the database connection: ', err);
    else console.log('Disconnected from the database');
    process.exit();
  });
});
