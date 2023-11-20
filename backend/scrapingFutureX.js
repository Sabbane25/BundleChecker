const mysql = require('mysql2');

// Fonction pour insérer des données dans la table Artikel
function insertDataIntoArtikel(connection, scrapedData) {
  try{
    for (const data of scrapedData) {
      const sqlArtikel = `INSERT INTO Artikel(Kategorie, Preis, ShopID, ProduktUrl, Bezeichnung, LieferDatum, Marke, Image)
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                          ON DUPLICATE KEY UPDATE Preis = VALUES(Preis), LieferDatum = VALUES(LieferDatum)`;

      const valuesArtikel = [
        data.kategorie,
        data.preis,
        data.shopID,
        data.produktlink,
        data.bezeichnung,
        data.deliveryDate,
        data.marke,
        data.imgUrl
      ];

      connection.query(sqlArtikel, valuesArtikel, (error, results) => {
        if (error) throw error;
        console.log('Objet inséré avec succès, ID:', results.insertId);
      });
    }
  }catch{
    console.error('****(Artikel)Une erreur s\'est produite:', err);
  }  
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
          console.log("L'insertion est possible ****");

          const sqlCpu = `INSERT INTO CPU (Artikelnummer, Url, Sockel, AnzahlKerne, Stromverbrauch, Taktfrequenz, InterneGrafik, Threads, Typ, Turbo)
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

function insertDataIntoCPU22(connection, scrapedData) {
  for (const data of scrapedData) {
    const sqlUrl = `SELECT * FROM CPU WHERE Url = "${data.produktlink}"`;

    try {
      connection.query(sqlUrl, (error, results) => {
        if (error) {
          console.error('Datenbank fehler', error);
        } else if (results.length > 0) {
          console.log('Url bereits vorhanden.');
        } else {
          console.log("L'insertion est possible ****");

          const sqlCpu = `INSERT INTO CPU (Artikelnummer, Url, Sockel, AnzahlKerne, Stromverbrauch, Taktfrequenz, InterneGrafik, Threads, Typ, Turbo)
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
            if (error) throw error;
            console.log('Objet inséré avec succès, ID:', resultat.insertId);
          });
        }
      });
    } catch (err) {
      console.error('Une erreur s\'est produite:', err);
      // Vous pouvez choisir de continuer le traitement ici si nécessaire
    }
  }
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

          const sqlCpu = `INSERT INTO Festplatte (Artikelnummer, Typ, Kapazitaet, Lesen, Schreiben, Url, Stromverbrauch)
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

          const sqlCpu = `INSERT INTO Gehäuse (Artikelnummer, Formfaktor, Frontanschlüsse, Abmessungen, Url, Typ, Gewicht)
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

          const sqlCpu = `INSERT INTO Grafikkarte (Artikelnummer, Kapazität, Model, Verbrauch, Url, StreamProzessoren)
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

// Fonction pour insérer des données dans la table Mainboard
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

          const sqlCpu = `INSERT INTO RAM (Artikelnummer, Typ, Kapazitaet, Latency, Url, Spannung)
          VALUES (?, ?, ?, ?, ?, ?)`;

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

          const sqlCpu = `INSERT INTO Netzteil (Artikelnummer, Leistung, Bauform, Url, Zertifizierung, Formfaktor)
          VALUES (?, ?, ?, ?, ?, ?)`;

          const valuesCpu = [
            null,
            data.leistung,
            data.bauForm,
            data.produktlink,
            data.zertifizierung,
            data.formfaktor
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
    insertDataIntoCPU(connection, scrapedData);
  }else if(artikelListe.kategorie === 'Gehäuse'){
    console.log('----- Gehäuse ---------'); 
    insertDataIntoGehaeuse(connection, scrapedData);
  }else if(artikelListe.kategorie === 'Grafikkarte'){
    console.log('----- Grafikkarte ---------'); 
    insertDataIntoGrafikkarte(connection, scrapedData);
  }else if(artikelListe.kategorie === 'Mainboard'){
    console.log('----- Mainboard ---------'); 
    insertDataIntoMainboard(connection, scrapedData);
  }else if(artikelListe.kategorie === 'RAM'){
    console.log('----- RAM ---------'); 
    insertDataIntoRam(connection, scrapedData);
  }else if(artikelListe.kategorie === 'Netzteil'){
    console.log('----- Netzteil ---------'); 
    insertDataIntoNetzteil(connection, scrapedData);
  }else{
    console.log('keine Liste gefunden');
  }
}

module.exports = {
  insertDataIntoArtikel,
  insertDataIntoCPU,
  insertArtikel
};
