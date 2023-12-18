/**
 * Backend-Server
 *
 * Dieser Server stellt die REST-API für den Frontend-Client bereit.
 *
 * Der Server läuft auf Port 3000.
 *
 * Der Server verwendet das Express-Framework.
 *
 * Der Server verwendet das cors-Paket, um CORS-Anfragen zu erlauben.
 *
 * Der Server verwendet das helmet-Paket, um die Sicherheit zu erhöhen.
 *
 * Der Server verwendet das MySQL2-Paket, um auf die Datenbank zuzugreifen.
 *
 * Der Server verwendet das jsonwebtoken-Paket, um JSON Web Tokens zu erstellen.
 *
 * Der Server verwendet das bcryptjs-Paket, um Passwörter zu hashen.
 *
 * Der Server verwendet das nodemailer-Paket, um E-Mails zu versenden.
 *
 * Der Server verwendet das cheerio-Paket, um HTML zu parsen.
 *
 * Der Server verwendet das request-Paket, um HTTP-Anfragen zu senden.
 *
 * @author Mokhtar Yosofzay
 */

const express = require('express'); // Importieren des Express-Frameworks
const path = require('path'); // Importieren des path-Pakets
const cors = require('cors'); // Importieren des cors-Pakets
const helmet = require('helmet');
const argv = require('yargs').argv;

const app = express(); // Initialisieren der Express-App
const port = process.env.PORT || argv.port ? argv.port : 80; // Port, auf dem der Server laufen wird

app.use(cors());

// Parse Anfragen mit Content-Type - application/json
app.use(express.json());

app.use(helmet());

// Parse Anfragen mit Content-Type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // erlaube anfragen
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
  res.setHeader('Content-Security-Policy', 'default-src \'self\' data: \'unsafe-inline\' \'unsafe-eval\' fonts.googleapis.com fonts.gstatic.com cdn.jsdelivr.net *.amazonaws.com *.tarox.de *.alternate.de;');
  next();
})

// Datenbank
const db = require("./models");
const Role = db.role;

db.sequelize.sync(); // Starte server ohne synchronisierung
// db.sequelize.sync({ alter: true }); // Synchronisiere Modelle mit Datenbank

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

// Statische Dateien aus dem Angular-Build-Ordner bereitstellen
app.use(express.static(path.join(__dirname, 'dist')));

require('./routes/auth.routes')(app);
require('./routes/artikel.routes')(app, connection);
require('./routes/kategorie.routes')(app, connection);
require('./routes/produkte.routes')(app, connection);
require('./routes/table.routes')(app, connection);
require('./routes/email.routes')(app, connection);
require('./routes/user.routes')(app, connection);
require('./routes/scrape.routes')(app, connection);
require('./routes/merkzettel.routes')(app, connection);

// Alle Anfragen, die nicht mit einer statischen Datei oder API-Route übereinstimmen, an die Index-Datei weiterleiten
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Server starten und auf Anfragen lauschen
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
