
const express = require('express'); // Importieren des Express-Frameworks
const cors = require('cors'); // Importieren des cors-Pakets
const helmet = require('helmet');

const app = express(); // Initialisieren der Express-App
const port = process.env.PORT || 3000; // Port, auf dem der Server laufen wird

var corsOptions = {
  origin: "http://localhost:4200",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Parse Anfragen mit Content-Type - application/json
app.use(express.json());

app.use(helmet());

// Parse Anfragen mit Content-Type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
})

// Datenbank
const db = require("./models");
const Role = db.role;

db.sequelize.sync(); // Starte server ohne synchronisierung
// db.sequelize.sync({ alter: true }); // Synchronisiere Modelle mit Datenbank

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
require('./routes/user.routes')(app, connection);
require('./routes/scrape.routes')(app, connection);

// Server starten und auf Anfragen lauschen
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
