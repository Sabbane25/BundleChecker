/**
 * Arnauld Mba Kuitche
 */
const mysql = require('mysql2');

/**
 * Diese Funktion fügt gecrapte Daten in die Datenbanktabelle "Artikel" ein oder aktualisiert sie,
 * falls ein Datensatz mit dem gleichen Primärschlüssel (produktUrl) bereits existiert.
 * @param {object} connection - Die Datenbankverbindung.
 * @param {Array} scrapedData - Ein Array von gecrapten Daten, die in die Datenbank eingefügt oder aktualisiert werden sollen.
 */
function insertDataIntoArtikel(connection, scrapedProductData) {
    const sqlArtikel = `INSERT INTO Artikel(kategorie, preis, shopID, produktUrl, bezeichnung, lieferDatum, marke, image, verfügbarkeit)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                        ON DUPLICATE KEY UPDATE preis = VALUES(preis), lieferDatum = VALUES(lieferDatum), verfügbarkeit = VALUES(verfügbarkeit)` ;

    const valuesArtikel = [
      scrapedProductData.kategorie,
      scrapedProductData.preis,
      scrapedProductData.shopID,
      scrapedProductData.produktlink,
      scrapedProductData.bezeichnung,
      scrapedProductData.deliveryDate,
      scrapedProductData.marke,
      scrapedProductData.imgUrl,
      scrapedProductData.verfuegbarkeit
    ];

    connection.query(sqlArtikel, valuesArtikel, (error, results) => {
      if (error) {
          console.error('Fehler beim Einfügen der Daten in Artikel:', error);
      } else {
          console.log('Objekt erfolgreich eingefügt, ID:', results.insertId);
      }
  });
}


/**
 * Diese Funktion aktualisiert Daten in der Datenbanktabelle "Artikel".
 * @param {object} connection - Die Datenbankverbindung.
 * @param {Array} updatedData - Ein Array von aktualisierten Daten, die in der Tabelle "Artikel" aktualisiert werden sollen.
 * @returns {Promise} - Ein Promise, das auflöst, wenn alle Aktualisierungsoperationen abgeschlossen sind.
 */
function updateDataInArtikel(connection, updatedData) {
  const updatePromises = [];

  for (const data of updatedData) {
    const sqlUpdate = `UPDATE Artikel
                       SET kategorie = ?, preis = ?, shopID = ?, bezeichnung = ?, lieferDatum = ?, marke = ?, image = ?, verfügbarkeit = ?
                       WHERE produktUrl = ?`;

    const valuesUpdate = [
      data.kategorie,
      data.preis,
      data.shopID,
      data.bezeichnung,
      data.deliveryDate,
      data.marke,
      data.imgUrl,
      data.verfuegbarkeit,
      data.produktlink
    ];

    const queryPromise = new Promise((resolve, reject) => {
      connection.query(sqlUpdate, valuesUpdate, (error, results) => {
        if (error) {
          console.error('Fehler beim Aktualisieren von Daten in Artikel:', data.produktlink, '\nError:', error);
          reject(error);
        } else {
          console.log('Objekt erfolgreich aktualisiert, ID:', results.affectedRows);
          resolve(results);
        }
      });
    });

    updatePromises.push(queryPromise);
  }

  return Promise.all(updatePromises);
}


/**
 * Diese Funktion fügt Daten in die Datenbanktabelle "Festplatte" ein, wobei Duplikate anhand der Produkt-URL vermieden werden.
 * Die Methode ruft auch die Funktion `insertDataIntoArtikel` auf, um allgemeine Artikelinformationen zu aktualisieren.
 * @param {object} connection - Die Datenbankverbindung.
 * @param {Array} scrapedData - Ein Array von gescannten Daten, die in der Tabelle "Festplatte" eingefügt werden sollen.
 * @returns {Promise} - Ein Promise, das auflöst, wenn alle Einfügeoperationen abgeschlossen sind.
 */
// insert Festplatten 
function insertDataIntoFestplatte(connection, scrapedProductData) {
  insertDataIntoArtikel(connection, scrapedProductData);
  const valueFestplatte = [
      null,  
      scrapedProductData.typ,
      scrapedProductData.kapazitaet,
      scrapedProductData.lesen,
      scrapedProductData.schreiben,
      scrapedProductData.produktlink
  ];

  const sqlUrl = `SELECT * FROM Festplatte WHERE url = "${scrapedProductData.url}"`;

    connection.query(sqlUrl, (error, results) => {
      if (error) {
          console.error('Datenbank fehler', error);
      } else if (results.length > 0) {
          console.log('Url bereits vorhanden.');
      } else {
        console.log("Import ist möglich ****");

        const sqlFestplatte = `INSERT INTO Festplatte (artikelnummer, typ, kapazitaet, lesen, schreiben, url)
          VALUES (?, ?, ?, ?, ?, ?)`;

          connection.query(sqlFestplatte, valueFestplatte, (error, resultat) => {
            if (error) {
                console.error('Fehler beim Einfügen der Daten in Festplatte:', error);
            } else {
                console.log('Objekt erfolgreich eingefügt, ID:', resultat.insertId);
            }
        });
      }
    });
}

function insertDataIntoCPU(connection, scrapedProductData) {
  insertDataIntoArtikel(connection, scrapedProductData);
  const valueCPU = [
      null,  
      scrapedProductData.produktlink,
      scrapedProductData.sockel,
      scrapedProductData.kerne,
      scrapedProductData.stromverbrauch,
      scrapedProductData.taktfrequenz,
      scrapedProductData.interneGrafik,
      scrapedProductData.threads,
      scrapedProductData.CPUTyp,
      scrapedProductData.maxTurboTaktfrequenz
  ];

  const sqlUrl = `SELECT * FROM CPU WHERE url = "${scrapedProductData.url}"`;

    connection.query(sqlUrl, (error, results) => {
      if (error) {
          console.error('Datenbank fehler', error);
      } else if (results.length > 0) {
          console.log('Url bereits vorhanden.');
      } else {
        console.log("Import ist möglich ****");

        const sqlCpu = `INSERT INTO CPU (artikelnummer, url, sockel, anzahlKerne, stromverbrauch, taktfrequenz, interneGrafik, threads, typ, turbo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

          connection.query(sqlCpu, valueCPU, (error, resultat) => {
            if (error) {
                console.error('Fehler beim Einfügen der Daten in Festplatte:', error);
            } else {
                console.log('Objekt erfolgreich eingefügt, ID:', resultat.insertId); 
            } 
        });
      }
    });
}

// Gehaeuse
function insertDataIntoGehaeuse(connection, scrapedProductData) {
  insertDataIntoArtikel(connection, scrapedProductData);
  const valueGehaeuse = [
      null,  
      scrapedProductData.mainboardFormfaktor,
      scrapedProductData.frontanschluesse,
      scrapedProductData.abmessung,
      scrapedProductData.produktlink,
      scrapedProductData.produkttyp,
      scrapedProductData.gewicht
  ];

  const sqlUrl = `SELECT * FROM Gehäuse WHERE url = "${scrapedProductData.url}"`;

  connection.query(sqlUrl, (error, results) => {
    if (error) {
        console.error('Datenbank fehler', error);
    } else if (results.length > 0) {
        console.log('Url bereits vorhanden.');
    } else {
      console.log("Import ist möglich ****");

      const sqlGehaeuse = `INSERT INTO Gehäuse (artikelnummer, formfaktor, frontanschlüsse, abmessungen, url, typ, gewicht)
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

        connection.query(sqlGehaeuse, valueGehaeuse, (error, resultat) => {
          if (error) {
              console.error('Fehler beim Einfügen der Daten in Festplatte:', error);
          } else {
              console.log('Objekt erfolgreich eingefügt, ID:', resultat.insertId);
          }
      });
    }
  });
}

// Grafikkarte
function insertDataIntoGrafikkarte(connection, scrapedProductData) {
  insertDataIntoArtikel(connection, scrapedProductData);
  const valueGrafikkarte = [
      null,  
      scrapedProductData.speicherKapazitaet,
      scrapedProductData.grafikprozessor,
      scrapedProductData.durchschnittlicherVerbrauch,
      scrapedProductData.produktlink,
      scrapedProductData.streamprozessorenAnzahl
  ];

  const sqlUrl = `SELECT * FROM Grafikkarte WHERE url = "${scrapedProductData.url}"`;

  connection.query(sqlUrl, (error, results) => {
    if (error) {
        console.error('Datenbank fehler', error);
    } else if (results.length > 0) {
        console.log('Url bereits vorhanden.');
    } else {
      console.log("Import ist möglich ****");

      const sqlGrafikkarte = `INSERT INTO Grafikkarte (artikelnummer, kapazitaet, model, verbrauch, url, streamProzessoren)
                              VALUES (?, ?, ?, ?, ?, ?)`;

        connection.query(sqlGrafikkarte, valueGrafikkarte, (error, resultat) => {
          if (error) {
              console.error('Fehler beim Einfügen der Daten in Festplatte:', error);
          } else {
              console.log('Objekt erfolgreich eingefügt, ID:', resultat.insertId);
          }
      });
    }
  });
}

// Mainboard
function insertDataIntoMainboard(connection, scrapedProductData) {
  insertDataIntoArtikel(connection, scrapedProductData);
  const valueMainboard = [
      null,  
      scrapedProductData.chipsatz,
      scrapedProductData.sockel,
      scrapedProductData.anzahlSpeichersockel,
      scrapedProductData.maximalSpeicher,
      scrapedProductData.produktlink,
      scrapedProductData.formfaktor,
      scrapedProductData.unterstuetzterSpeichertyp
  ];

  const sqlUrl = `SELECT * FROM Mainboard WHERE url = "${scrapedProductData.url}"`;

  connection.query(sqlUrl, (error, results) => {
    if (error) {
        console.error('Datenbank fehler', error);
    } else if (results.length > 0) {
        console.log('Url bereits vorhanden.');
    } else {
      console.log("Import ist möglich ****");

      const sqlMainboard = `INSERT INTO Mainboard (artikelnummer, chipsatz, sockel, anzahlSpeichersockel, maxRam, url, formFaktor, speicherTyp)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        connection.query(sqlMainboard, valueMainboard, (error, resultat) => {
          if (error) {
              console.error('Fehler beim Einfügen der Daten in Festplatte:', error);
          } else {
              console.log('Objekt erfolgreich eingefügt, ID:', resultat.insertId);
          }
      });
    }
  });
}

// insert RAM 
function insertDataIntoRam(connection, scrapedProductData) {
  insertDataIntoArtikel(connection, scrapedData);
  const valuesRam = [
      null,  
      scrapedProductData.typ,
      scrapedProductData.kapazitaet,
      scrapedProductData.latency,
      scrapedProductData.produktlink,
      scrapedProductData.spannung,
  ];

  const sqlUrl = `SELECT * FROM CPU WHERE url = "${scrapedProductData.url}"`;

  connection.query(sqlUrl, (error, results) => {
    if (error) {
        console.error('Datenbank fehler', error);
    } else if (results.length > 0) {
        console.log('Url bereits vorhanden.');
    } else {
      console.log("Import ist möglich ****");

      const sqlRam = `INSERT INTO RAM (artikelnummer, typ, kapazitaet, latency, url, spannung) 
                      VALUES (?, ?, ?, ?, ?, ?)`;

      connection.query(sqlRam, valuesRam, (error, resultat) => {
        if (error) {
            console.error('Fehler beim Einfügen der Daten in RAM:', error);
        } else {
            console.log('Objekt erfolgreich eingefügt, ID:', resultat.insertId);
        }
      });
    }
  });
}

// insert Netzteil
function insertDataIntoNetzteil(connection, scrapedProductData) {
  insertDataIntoArtikel(connection, scrapedProductData);
  const valuesNetzteil = [
      null,  
      scrapedProductData.bauForm,
      scrapedProductData.produktlink,
      scrapedProductData.zertifizierung,
      scrapedProductData.leistung,
  ];

  const sqlUrl = `SELECT * FROM Netzteil WHERE url = "${scrapedProductData.url}"`;

  connection.query(sqlUrl, (error, results) => {
    if (error) {
        console.error('Datenbank fehler', error);
    } else if (results.length > 0) {
        console.log('Url bereits vorhanden.');
    } else {
      console.log("Import ist möglich ****");

      const sqlNetzteil = `INSERT INTO Netzteil (artikelnummer, bauform, url, zertifizierung, leistung)
      VALUES (?, ?, ?, ?, ?)`;

      connection.query(sqlNetzteil, valuesNetzteil, (error, resultat) => {
        if (error) {
            console.error('Fehler beim Einfügen der Daten in RAM:', error);
        } else {
            console.log('Objekt erfolgreich eingefügt, ID:', resultat.insertId);
        }
      });
    }
  });
}


/**
 * Diese Funktion fügt Artikel basierend auf der Kategorie in die Datenbank ein.
 * Je nach Kategorie wird die entsprechende Funktion für das Einfügen aufgerufen.
 * @param {object} connection - Die Datenbankverbindung.
 * @param {object} artikelListe - Ein Objekt, das die Artikelkategorie und die dazugehörigen Daten enthält.
 */
function insertArtikel(connection, artikelListe){

  if(artikelListe.kategorie === 'Festplatte'){
    console.log('----- Festplatte ---------'); 
    insertDataIntoFestplatte(connection, artikelListe.value);
  }else if(artikelListe.kategorie === 'CPU'){
    console.log('----- CPU ---------'); 
    insertDataIntoCPU(connection, artikelListe.value);
  }else if(artikelListe.kategorie === 'Gehäuse'){
    console.log('----- Gehaeuse ---------'); 
    insertDataIntoGehaeuse(connection, artikelListe.value);
  }else if(artikelListe.kategorie === 'Grafikkarte'){
    console.log('----- Grafikkarte ---------'); 
    insertDataIntoGrafikkarte(connection, artikelListe.value);
  }else if(artikelListe.kategorie === 'Mainboard'){
    console.log('----- Mainboard ---------'); 
    insertDataIntoMainboard(connection, artikelListe.value);
  }else if(artikelListe.kategorie === 'RAM'){
    console.log('----- RAM ---------'); 
    insertDataIntoRam(connection, artikelListe.value);
  }else if(artikelListe.kategorie === 'Netzteil'){
    console.log('----- Netzteil ---------'); 
    insertDataIntoNetzteil(connection, artikelListe.value);
  }else{
    console.log('keine Liste gefunden');
  }
}

module.exports = {
  insertDataIntoArtikel,
  insertDataIntoCPU,
  insertArtikel,
  updateDataInArtikel
};
