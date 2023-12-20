const mysql = require('mysql2');

/**
 * Diese Funktion fügt gecrapte Daten in die Datenbanktabelle "Artikel" ein oder aktualisiert sie,
 * falls ein Datensatz mit dem gleichen Primärschlüssel (produktUrl) bereits existiert.
 * @param {object} connection - Die Datenbankverbindung.
 * @param {Array} scrapedData - Ein Array von gecrapten Daten, die in die Datenbank eingefügt oder aktualisiert werden sollen.
 */
function insertDataIntoArtikel(connection, scrapedData) {

  for (const data of scrapedData) {
    const sqlArtikel2 = `INSERT INTO Artikel(kategorie, preis, shopID, produktUrl, bezeichnung, lieferDatum, marke, image, verfügbarkeit)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const sqlArtikel3 = `INSERT INTO Artikel(kategorie, preis, shopID, produktUrl, bezeichnung, lieferDatum, marke, image, verfügbarkeit)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE preis = VALUES(preis), lieferDatum = VALUES(produktlink), verfügbarkeit = VALUES(verfuegbarkeit)`;


    const sqlArtikel = `INSERT INTO Artikel(kategorie, preis, shopID, produktUrl, bezeichnung, lieferDatum, marke, image, verfügbarkeit)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                        ON DUPLICATE KEY UPDATE
                          kategorie = VALUES(kategorie),
                          preis = VALUES(preis),
                          shopID = VALUES(shopID),
                          bezeichnung = VALUES(bezeichnung),
                          lieferDatum = VALUES(lieferDatum),
                          marke = VALUES(marke),
                          image = VALUES(image),
                          verfügbarkeit = VALUES(verfügbarkeit)`;


    const valuesArtikel = [
      data.kategorie,
      data.preis,
      data.shopID,
      data.produktlink,
      data.bezeichnung,
      data.deliveryDate,
      data.marke,
      data.imgUrl,
      data.verfuegbarkeit
    ];

    connection.query(sqlArtikel, valuesArtikel, (error, results) => {
      if (error) {
        console.error('Fehler beim Einfügen von Daten in Artikel:', data.produktlink, '\nErreur:', error);
      } else {
        console.log('Objekt erfolgreich eingefügt, ID:', results.insertId);
      }
    });
  }
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
 * Diese Funktion fügt gecrapte CPU-Daten in die Datenbanktabelle "CPU" ein, wenn die URL noch nicht vorhanden ist.
 * @param {object} connection - Die Datenbankverbindung.
 * @param {Array} scrapedData - Ein Array von gecrapten CPU-Daten, die in die Datenbank eingefügt werden sollen.
 * @returns {Promise[]} - Ein Array von Promises, die den Einfügevorgang für jede CPU repräsentieren.
 */
function insertDataIntoCPU(connection, scrapedData) {
  const insertPromises = [];

  for (const data of scrapedData) {
    const sqlUrl = `SELECT * FROM CPU WHERE Url = "${data.produktlink}"`;

    const queryPromise = new Promise((resolve, reject) => {
      connection.query(sqlUrl, (error, results) => {
        if (error) {
          console.error('Datenbank Fehler', error);
          reject(error);
        } else if (results.length > 0) {
          console.log('Url bereits vorhanden.');
          resolve(); 
        } else {
          console.log("Artikle insere");

          const sqlCpu = `INSERT INTO CPU (artikelnummer, url, sockel, anzahlKerne, stromverbrauch, taktfrequenz, interneGrafik, threads, typ, turbo)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

          const valuesCpu = [
            null,
            data.produktlink,
            data.sockel,
            data.kerne,
            data.stromverbrauch,
            data.taktfrequenz,
            data.interneGrafik,
            data.threads,
            data.CPUTyp,
            data.maxTurboTaktfrequenz
          ];

          console.log('Werte von valuesCPU:  ', valuesCpu);
          connection.query(sqlCpu, valuesCpu, (error, resultat) => {
            if (error) {
              console.error('Fehler beim Einfügen', error);
              reject(error);
            } else {
              console.log('Objekt erfolgreich eingefügt, ID:', resultat.insertId);
              resolve(); 
            }
          });
        }
      });
    });

    insertPromises.push(queryPromise);
  }

  return Promise.allSettled(insertPromises)
    .then(() => {
      console.log('Alle Produkte wurden hinzugefügt');
    })
    .catch((err) => {
      console.error('Es ist ein Fehler aufgetreten:', err);
  });
}

function insertDataIntoCPU2(connection, scrapedData) {
  const insertPromises = [];

  for (const data of scrapedData) {
    if (!data.produktlink) {
      console.error('Die Eigenschaft "produktlink" fehlt oder ist in den Daten nicht vorhanden.');
      continue;  
    }

    const sqlUrl = `SELECT * FROM CPU WHERE Url = "${data.produktlink}"`;

    const queryPromise = new Promise((resolve, reject) => {
      connection.query(sqlUrl, (error, results) => {
        if (error) {
          console.error('Datenbank Fehler', error);
          reject(error);
        } else if (results.length > 0) {
          console.log('Url bereits vorhanden.');
          resolve();  
        } else {
          console.log("**** Einfügen ist möglich ****");

          const sqlCpu = `INSERT INTO CPU (artikelnummer, url, sockel, anzahlKerne, stromverbrauch, taktfrequenz, interneGrafik, threads, typ, turbo)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

          const valuesCpu = [
            null,
            data.produktlink,
            data.sockel,
            data.kerne,
            data.stromverbrauch,
            data.taktfrequenz,
            data.interneGrafik,
            data.threads,
            data.CPUTyp,
            data.maxTurboTaktfrequenz
          ];


          connection.query(sqlCpu, valuesCpu, (error, resultat) => {
            if (error) {
              console.error('Fehler beim Einfügen', error);
              reject(error);
            } else {
              console.log('Komponente erfolgreich eingefügt, ID:', resultat.insertId);
              resolve();  
            }
          });
        }
      });
    });

    insertPromises.push(queryPromise);
  }

  return Promise.all(insertPromises);
}


/**
 * Diese Funktion fügt Daten in die Datenbanktabelle "Festplatte" ein, wobei Duplikate anhand der Produkt-URL vermieden werden.
 * Die Methode ruft auch die Funktion `insertDataIntoArtikel` auf, um allgemeine Artikelinformationen zu aktualisieren.
 * @param {object} connection - Die Datenbankverbindung.
 * @param {Array} scrapedData - Ein Array von gescannten Daten, die in der Tabelle "Festplatte" eingefügt werden sollen.
 * @returns {Promise} - Ein Promise, das auflöst, wenn alle Einfügeoperationen abgeschlossen sind.
 */
function insertDataIntoFestplatte(connection, scrapedData) {

  insertDataIntoArtikel(connection, scrapedData);

  const insertPromises = [];

  for (const data of scrapedData) {
    const sqlUrl = `SELECT * FROM Festplatte WHERE Url = "${data.produktlink}"`;

    const queryPromise = new Promise((resolve, reject) => {
      connection.query(sqlUrl, (error, results) => {
        if (error) {
          console.error('Datenbank fehler', error);
          reject(error);
        } else if (results.length > 0) {
          console.log("**** Einfügen ist möglich ****");
          resolve();  
        } else {
          console.log("*** Einfügen möglich ****");

          const sqlCpu = `INSERT INTO Festplatte (artikelnummer, typ, kapazitaet, lesen, schreiben, Url, stromverbrauch)
          VALUES (?, ?, ?, ?, ?, ?, ?)`;

          const valuesCpu = [
            null,
            data.typ,
            data.kapazitaet,
            data.lesen,
            data.schreiben,
            data.produktlink,
            data.energieverbrauch
          ];

          connection.query(sqlCpu, valuesCpu, (error, resultat) => {
            if (error) {
              console.error('Fehler beim Einfügen', error);
              reject(error);
            } else {
              console.log('Komponente erfolgreich eingefügt, ID:', resultat.insertId);
              resolve(); 
            }
          });
        }
      });
    });

    insertPromises.push(queryPromise);
  }

  return Promise.allSettled(insertPromises)
    .then(() => {
      console.log('Alle Einfügungen wurden bearbeitet.');
    })
    .catch((err) => {
      console.error('Es ist ein Fehler aufgetreten:', err);
  });
}

// Einfügen (Gehaeuse)
function insertDataIntoGehaeuse(connection, scrapedData) {

  insertDataIntoArtikel(connection, scrapedData);
  const insertPromises = [];

  for (const data of scrapedData) {
    const sqlUrl = `SELECT * FROM Gehäuse WHERE Url = "${data.produktlink}"`;

    const queryPromise = new Promise((resolve, reject) => {
      connection.query(sqlUrl, (error, results) => {
        if (error) {
          console.error('Datenbank fehler', error);
          reject(error);
        } else if (results.length > 0) {
          console.log('Url bereits vorhanden.');
          resolve();  // Continue with the next iteration
        } else {
          console.log("L'insertion est possible ****");

          const sqlCpu = `INSERT INTO Gehäuse (artikelnummer, formfaktor, frontanschlüsse, abmessungen, url, typ, gewicht)
          VALUES (?, ?, ?, ?, ?, ?, ?)`;

          const valuesCpu = [
            null,
            data.mainboardFormfaktor,
            data.frontanschluesse,
            data.abmessung,
            data.produktlink,
            data.produkttyp,
            data.gewicht
          ];

          connection.query(sqlCpu, valuesCpu, (error, resultat) => {
            if (error) {
              console.error('Erreur lors de l\'insertion', error);
              reject(error);
            } else {
              console.log('Objet inséré avec succès, ID:', resultat.insertId);
              resolve();  
            }
          });
        }
      });
    });
    insertPromises.push(queryPromise);
  }

  return Promise.allSettled(insertPromises)
    .then(() => {
      console.log('Toutes les insertions ont été traitées.');
    })
    .catch((err) => {
      console.error('Une erreur s\'est produite:', err);
  });
}

// Grafikkarte
function insertDataIntoGrafikkarte(connection, scrapedData) {

  insertDataIntoArtikel(connection, scrapedData);
  const insertPromises = [];

  for (const data of scrapedData) {
    const sqlUrl = `SELECT * FROM Grafikkarte WHERE Url = "${data.produktlink}"`;

    const queryPromise = new Promise((resolve, reject) => {
      connection.query(sqlUrl, (error, results) => {
        if (error) {
          console.error('Datenbank fehler', error);
          reject(error);
        } else if (results.length > 0) {
          console.log('Url bereits vorhanden.');
          resolve();  
        } else {
          console.log("L'insertion est possible ****");

          const sqlCpu = `INSERT INTO Grafikkarte (artikelnummer, kapazitaet, model, verbrauch, url, streamProzessoren)
          VALUES (?, ?, ?, ?, ?, ?)`;

          const valuesCpu = [
            null,
            data.speicherKapazitaet,
            data.grafikprozessor,
            data.durchschnittlicherVerbrauch,
            data.produktlink,
            data.streamprozessorenAnzahl
          ];

          connection.query(sqlCpu, valuesCpu, (error, resultat) => {
            if (error) {
              console.error('Fehler beim Einfügen', error);
              reject(error);
            } else {
              console.log('Komponente erfolgreich eingefügt, ID:', resultat.insertId);
              resolve();  // Continue with the next iteration
            }
          });
        }
      });
    });
    insertPromises.push(queryPromise);
  }

  return Promise.allSettled(insertPromises)
    .then(() => {
      console.log('Komponente erfolgreich eingefügt, ID:');
    })
    .catch((err) => {
      console.error('Fehler beim Einfügen', err);
  });
}

// Mainboard
function insertDataIntoMainboard(connection, scrapedData) {

  insertDataIntoArtikel(connection, scrapedData);
  const insertPromises = [];

  for (const data of scrapedData) {
    const sqlUrl = `SELECT * FROM Mainboard WHERE Url = "${data.produktlink}"`;

    const queryPromise = new Promise((resolve, reject) => {
      connection.query(sqlUrl, (error, results) => {
        if (error) {
          console.error('Datenbank Fehler', error);
          reject(error);
        } else if (results.length > 0) {
          console.log('Url bereits vorhanden.');
          resolve(); 
        } else {
          console.log("***** L'insertion *****");

          const sqlCpu = `INSERT INTO Mainboard (Artikelnummer, Chipsatz, Sockel, AnzahlSpeichersockel, MaxRam, Url, FormFaktor, SpeicherTyp)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

          const valuesCpu = [
            null,
            data.chipsatz,
            data.sockel,
            data.anzahlSpeichersockel,
            data.maximalSpeicher,
            data.produktlink,
            data.formfaktor,
            data.unterstuetzterSpeichertyp
          ];

          connection.query(sqlCpu, valuesCpu, (error, resultat) => {
            if (error) {
              console.error('Fehler beim Einfügen', error);
              reject(error);
            } else {
              console.log('Komponente erfolgreich eingefügt, ID:', resultat.insertId);
              resolve(); 
            }
          });
        }
      });
    });
    insertPromises.push(queryPromise);
  }

  return Promise.allSettled(insertPromises)
    .then(() => {
      console.log('Alle Einfügungen wurden bearbeitet.');
    })
    .catch((err) => {
      console.error('Es ist ein Fehler aufgetreten:', err);
  });
}

//  RAM
function insertDataIntoRam(connection, scrapedData) {

  insertDataIntoArtikel(connection, scrapedData);
  const insertPromises = [];

  for (const data of scrapedData) {
    const sqlUrl = `SELECT * FROM RAM WHERE Url = "${data.produktlink}"`;

    const queryPromise = new Promise((resolve, reject) => {
      connection.query(sqlUrl, (error, results) => {
        if (error) {
          console.error('Datenbank fehler', error);
          reject(error);
        } else if (results.length > 0) {
          console.log('Url bereits vorhanden.');
          resolve();  // Continue with the next iteration
        } else {

          const sqlCpu = `INSERT INTO RAM (artikelnummer, typ, kapazitaet, latency, url, spannung)
          VALUES (?, ?, ?, ?, ?, ?)`;

          const valuesCpu = [
            null,
            data.typ,
            data.kapazitaet,
            data.latency,
            data.produktlink,
            data.spannung
          ];

          connection.query(sqlCpu, valuesCpu, (error, resultat) => {
            if (error) {
              console.error('Fehler beim Einfügen', error);
              reject(error);
            } else {
              console.log('Komponente erfolgreich eingefügt, ID:', resultat.insertId);
              resolve();  
            }
          });
        }
      });
    });
    insertPromises.push(queryPromise);
  }

  return Promise.allSettled(insertPromises)
    .then(() => {
      console.log('Alle Einfügungen wurden bearbeitet.');
    })
    .catch((err) => {
      console.error('Fehler beim Einfügen', err);
  });
}

//Netzteil
function insertDataIntoNetzteil(connection, scrapedData) {

  insertDataIntoArtikel(connection, scrapedData);
  const insertPromises = [];

  for (const data of scrapedData) {
    const sqlUrl = `SELECT * FROM Netzteil WHERE Url = "${data.produktlink}"`;

    const queryPromise = new Promise((resolve, reject) => {
      connection.query(sqlUrl, (error, results) => {
        if (error) {
          console.error('Datenbank Fehler', error);
          reject(error);
        } else if (results.length > 0) {
          console.log('Url bereits vorhanden.');
          resolve(); 
        } else {

          const sqlCpu = `INSERT INTO Netzteil (artikelnummer, bauform, url, zertifizierung, leistung)
          VALUES (?, ?, ?, ?, ?)`;

          const valuesCpu = [
            null,
            data.bauForm,
            data.produktlink,
            data.zertifizierung,
            data.leistung
          ];

          connection.query(sqlCpu, valuesCpu, (error, resultat) => {
            if (error) {
              console.error('Fehler beim Einfügen', error);
              reject(error);
            } else {
              console.log('Komponente erfolgreich eingefügt, ID:', resultat.insertId);
              resolve();  
            }
          });
        }
      });
    });
    insertPromises.push(queryPromise);
  }

  return Promise.allSettled(insertPromises)
    .then(() => {
      console.log('Komponente erfolgreich eingefügt, ID:');
    })
    .catch((err) => {
      console.error('Fehler beim Einfügen', err);
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
    console.log('----- Gehäuse ---------'); 
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
