/**
 * Scraping FutureX
 * Arnauld Mba Kuitche
 *
 */
const mysql = require('mysql2');

// Funktion zum Einfügen von Daten in die Tabelle Artikel
function insertDataIntoArtikel(connection, scrapedData) {
  for (const data of scrapedData) {
    const sqlArtikel = `INSERT INTO Artikel(Kategorie, Preis, ShopID, ProduktUrl, Bezeichnung, LieferDatum)
                        VALUES (?, ?, ?, ?, ?, ?)
                        ON DUPLICATE KEY UPDATE Preis = VALUES(Preis), LieferDatum = VALUES(LieferDatum)`;

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
}

// Funktion zum Einfügen von Daten in die CPU-Tabelle
function insertDataIntoCPU(connection, scrapedData) {
  for (const data of scrapedData) {
    const sqlUrl = `SELECT * FROM CPU WHERE Url = "${data.produktlink}"`;

    connection.query(sqlUrl, (error, results) => {
      if (error) {
        console.error('Datenbank fehler', error);
      } else if (results.length > 0) {
        console.log('Url bereits vorhanden.');
      } else {
        console.log("L'insertion est possible ****");

        const sqlCpu = `INSERT INTO CPU (Artikelnummer, Url, Sockel, AnzahlKerne, Stromverbrauch, Taktfrequenz, InterneGrafik, Threads)
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

        connection.query(sqlCpu, valuesCpu, (error, resultat) => {
          if (error) throw error;
          console.log('Objet inséré avec succès, ID:', resultat.insertId);
        });
      }
    });
  }
}

module.exports = {
  insertDataIntoArtikel,
  insertDataIntoCPU,
};
