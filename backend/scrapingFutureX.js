const mysql = require('mysql2');

// Fonction pour insérer des données dans la table Artikel
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
        console.error('Error inserting data into Artikel:', data.produktlink, '\nErreur:', error);
      } else {
        console.log('Object inserted successfully, ID:', results.insertId);
      }
    });
  }
}

// Insert Data into Artikel Tabelle DB
function insertDataIntoArtikel3(connection, scrapedData) {

  for (const data of scrapedData) {
    const sqlArtikel = `INSERT INTO Artikel(kategorie, preis, shopID, produktUrl, bezeichnung, lieferDatum, marke, image, verfügbarkeit)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
        console.error('Error inserting data into Artikel:', data.produktlink, '\nErreur:', error);
      } else {
        console.log('Object inserted successfully, ID:', results.insertId);
      }
    });
  }
}

function insertDataIntoArtikel2(connection, scrapedData) {
  const insertPromises = scrapedData.map(data => {
    const sqlArtikel = `INSERT INTO Artikel(kategorie, preis, shopID, produktUrl, bezeichnung, lieferDatum, marke, image, verfügbarkeit)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE preis = VALUES(preis), lieferDatum = VALUES(deliveryDate), verfügbarkeit = VALUES(verfuegbarkeit)`;

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

    return new Promise((resolve, reject) => {
      connection.query(sqlArtikel, valuesArtikel, (error, results) => {
        if (error) {
          console.error('Une erreur s\'est produite pour l\'élément avec ProduktUrl:', data.produktlink, '\nErreur:', error);
          reject(error);
        } else {
          console.log('Objet inséré avec succès, ID:', results.insertId);
          resolve(results);
        }
      });
    });
  });

  // Utiliser Promise.all pour attendre l'achèvement de toutes les requêtes
  return Promise.all(insertPromises);
}

// Fonction pour Udate les donnees deja present dans la base de donnees 
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
          console.error('Error updating data in Artikel:', data.produktlink, '\nError:', error);
          reject(error);
        } else {
          console.log('Object updated successfully, ID:', results.affectedRows);
          resolve(results);
        }
      });
    });

    updatePromises.push(queryPromise);
  }

  // Utiliser Promise.all pour attendre l'achèvement de toutes les requêtes
  return Promise.all(updatePromises);
}


// Fonction pour insérer des données dans la table CPU
function insertDataIntoCPU(connection, scrapedData) {
  const insertPromises = [];

  for (const data of scrapedData) {
    const sqlUrl = `SELECT * FROM CPU WHERE Url = "${data.produktlink}"`;

    const queryPromise = new Promise((resolve, reject) => {
      connection.query(sqlUrl, (error, results) => {
        if (error) {
          console.error('Datenbank fehler', error);
          reject(error);
        } else if (results.length > 0) {
          console.log('Url bereits vorhanden.');
          resolve();  // Continue with the next iteration
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

          console.log('valeur de valuesCPU: ', valuesCpu);
          connection.query(sqlCpu, valuesCpu, (error, resultat) => {
            if (error) {
              console.error('Erreur lors de l\'insertion', error);
              reject(error);
            } else {
              console.log('Objet inséré avec succès, ID:', resultat.insertId);
              resolve();  // Continue with the next iteration
            }
          });
        }
      });
    });

    insertPromises.push(queryPromise);
  }

  // Execute all promises and continue even if some fail
  return Promise.allSettled(insertPromises)
    .then(() => {
      console.log('Toutes les insertions ont été traitées.');
    })
    .catch((err) => {
      console.error('Une erreur s\'est produite:', err);
  });
}

// Fonction pour insérer des données dans la table CPU
function insertDataIntoCPU2(connection, scrapedData) {
  const insertPromises = [];

  for (const data of scrapedData) {
    if (!data.produktlink) {
      console.error('La propriété "produktlink" est manquante ou nulle dans les données.');
      continue;  // Continue with the next iteration
    }

    const sqlUrl = `SELECT * FROM CPU WHERE Url = "${data.produktlink}"`;

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

          console.log('valeur de valuesCPU: ', valuesCpu);

          connection.query(sqlCpu, valuesCpu, (error, resultat) => {
            if (error) {
              console.error('Erreur lors de l\'insertion', error);
              reject(error);
            } else {
              console.log('Objet inséré avec succès, ID:', resultat.insertId);
              resolve();  // Continue with the next iteration
            }
          });
        }
      });
    });

    insertPromises.push(queryPromise);
  }

  // Utiliser Promise.all pour attendre l'achèvement de toutes les requêtes
  return Promise.all(insertPromises);
}


// Fonction pour insérer des données dans la table Festplatte
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
          console.log('Url bereits vorhanden.');
          resolve();  // Continue with the next iteration
        } else {
          console.log("L'insertion est possible ****");

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
              console.error('Erreur lors de l\'insertion', error);
              reject(error);
            } else {
              console.log('Objet inséré avec succès, ID:', resultat.insertId);
              resolve();  // Continue with the next iteration
            }
          });
        }
      });
    });

    insertPromises.push(queryPromise);
  }

  // Execute all promises and continue even if some fail
  return Promise.allSettled(insertPromises)
    .then(() => {
      console.log('Toutes les insertions ont été traitées.');
    })
    .catch((err) => {
      console.error('Une erreur s\'est produite:', err);
  });
}

// Fonction pour insérer des données dans la table Gehäuse
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
              resolve();  // Continue with the next iteration
            }
          });
        }
      });
    });
    insertPromises.push(queryPromise);
  }

  // Execute all promises and continue even if some fail
  return Promise.allSettled(insertPromises)
    .then(() => {
      console.log('Toutes les insertions ont été traitées.');
    })
    .catch((err) => {
      console.error('Une erreur s\'est produite:', err);
  });
}

// Fonction pour insérer des données dans la table Grafikkarte
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
          resolve();  // Continue with the next iteration
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
              console.error('Erreur lors de l\'insertion', error);
              reject(error);
            } else {
              console.log('Objet inséré avec succès, ID:', resultat.insertId);
              resolve();  // Continue with the next iteration
            }
          });
        }
      });
    });
    insertPromises.push(queryPromise);
  }

  // Execute all promises and continue even if some fail
  return Promise.allSettled(insertPromises)
    .then(() => {
      console.log('Toutes les insertions ont été traitées.');
    })
    .catch((err) => {
      console.error('Une erreur s\'est produite:', err);
  });
}

// Fonction pour insérer des données dans la table Mainboard
function insertDataIntoMainboard(connection, scrapedData) {

  insertDataIntoArtikel(connection, scrapedData);
  const insertPromises = [];

  for (const data of scrapedData) {
    const sqlUrl = `SELECT * FROM Mainboard WHERE Url = "${data.produktlink}"`;

    const queryPromise = new Promise((resolve, reject) => {
      connection.query(sqlUrl, (error, results) => {
        if (error) {
          console.error('Datenbank fehler', error);
          reject(error);
        } else if (results.length > 0) {
          console.log('Url bereits vorhanden.');
          resolve();  // Continue with the next iteration
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
              console.error('Erreur lors de l\'insertion', error);
              reject(error);
            } else {
              console.log('Objet inséré avec succès, ID:', resultat.insertId);
              resolve();  // Continue with the next iteration
            }
          });
        }
      });
    });
    insertPromises.push(queryPromise);
  }

  // Execute all promises and continue even if some fail
  return Promise.allSettled(insertPromises)
    .then(() => {
      console.log('Toutes les insertions ont été traitées.');
    })
    .catch((err) => {
      console.error('Une erreur s\'est produite:', err);
  });
}

// Fonction pour insérer des données dans la table RAM
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
          console.log("***** L'insertion *****");

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
              console.error('Erreur lors de l\'insertion', error);
              reject(error);
            } else {
              console.log('Objet inséré avec succès, ID:', resultat.insertId);
              resolve();  // Continue with the next iteration
            }
          });
        }
      });
    });
    insertPromises.push(queryPromise);
  }

  // Execute all promises and continue even if some fail
  return Promise.allSettled(insertPromises)
    .then(() => {
      console.log('Toutes les insertions ont été traitées.');
    })
    .catch((err) => {
      console.error('Une erreur s\'est produite:', err);
  });
}

// Fonction pour insérer des données dans la table Netzteil
function insertDataIntoNetzteil(connection, scrapedData) {

  insertDataIntoArtikel(connection, scrapedData);
  const insertPromises = [];

  for (const data of scrapedData) {
    const sqlUrl = `SELECT * FROM Netzteil WHERE Url = "${data.produktlink}"`;

    const queryPromise = new Promise((resolve, reject) => {
      connection.query(sqlUrl, (error, results) => {
        if (error) {
          console.error('Datenbank fehler', error);
          reject(error);
        } else if (results.length > 0) {
          console.log('Url bereits vorhanden.');
          resolve();  // Continue with the next iteration
        } else {
          console.log("***** L'insertion *****");

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
              console.error('Erreur lors de l\'insertion', error);
              reject(error);
            } else {
              console.log('Objet inséré avec succès, ID:', resultat.insertId);
              resolve();  // Continue with the next iteration
            }
          });
        }
      });
    });
    insertPromises.push(queryPromise);
  }

  // Execute all promises and continue even if some fail
  return Promise.allSettled(insertPromises)
    .then(() => {
      console.log('Toutes les insertions ont été traitées.');
    })
    .catch((err) => {
      console.error('Une erreur s\'est produite:', err);
  });
}

//Insert les donnees dans la base de donnees en fonction de la categorie
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
