// Autor: Oussama Soujoud

const mysql = require('mysql2');

// Funktion zum Einfügen von Daten in die Komponenten-Tabelle basierend auf der Kategorie des gecrawlten Produkts
function insertDataIntoKomponenten(connection, scrapedData){
    for (const scrapedProductData of scrapedData) {
          switch (scrapedProductData.category) {
            case 'RAM':
                insertDataIntoRAM2(connection, scrapedData);
              break;
            case 'Prozessor':
                insertDataIntoCPU2(connection, scrapedData);
                break;
            case 'Gehaeuse':
                insertDataIntoGehäuse2(connection, scrapedData);
                break;
            case 'Festplatte':
                insertDataIntoFestplatte2(connection, scrapedData);
                break;
            case 'Grafikkarte':
                insertDataIntoGrafikkarte2(connection, scrapedData);
                break;
            case 'Mainboard':
                insertDataIntoMainboard2(connection, scrapedData);
                    break;
            case 'Netzteil':
                insertDataIntoNetzteil2(connection, scrapedData);
                    break;
    }   
}
}

// Funktion zum Einfügen von Daten in die Artikel-Tabelle
function insertDataIntoArtikel2(connection, scrapedData) {
    for (const scrapedProductData of scrapedData) {
      const sqlArtikel = `INSERT INTO Artikel(kategorie, preis, shopID, produktUrl, bezeichnung, lieferDatum, marke, image, verfügbarkeit)
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                          ON DUPLICATE KEY UPDATE preis = VALUES(preis), lieferDatum = VALUES(lieferDatum), verfügbarkeit = VALUES(verfügbarkeit)` ;
  
      const valuesArtikel = [
        scrapedProductData.category,
        scrapedProductData.price,
        scrapedProductData.shopID,
        scrapedProductData.url,
        scrapedProductData.productName,
        scrapedProductData.deliveryDate,
        scrapedProductData.marke,
        scrapedProductData.image,
        scrapedProductData.verfügbarkeit
      ];
  
      connection.query(sqlArtikel, valuesArtikel, (error, results) => {
        if (error) {
            console.error('Fehler beim Einfügen der Daten in Artikel:', error);
        } else {
            console.log('Objekt erfolgreich eingefügt, ID:', results.insertId);
        }
    });
  }
}

// Diese Funktionen führen das Einfügen in die entsprechenden Tabellen durch, basierend auf der Kategorie des gecrawlten Produkts
// Die Verarbeitung der Daten und das Einfügen in die Datenbank sind ähnlich, aber die Spalten und die Logik können je nach Kategorie unterschiedlich sein
// Hier ein Beispiel für die Funktion zum Einfügen in die CPU-Tabelle:

  function insertDataIntoCPU2(connection, scrapedData) {
    for (const scrapedProductData of scrapedData) {
        // Hier werden die Werte für das Einfügen in die CPU-Tabelle vorbereitet
        const valuesCpu = [
            null, 
            scrapedProductData.url,
            scrapedProductData.sockel,
            scrapedProductData.anzahl,
            scrapedProductData.stromverbrauch,
            scrapedProductData.taktfrequenz,
            scrapedProductData.gpu,
            scrapedProductData.threads,
            scrapedProductData.typ,
            scrapedProductData.turbo
        ];

        // Hier wird geprüft, ob die URL bereits in der Datenbank vorhanden ist
        const sqlUrl = `SELECT * FROM CPU WHERE url = "${scrapedProductData.url}"`;

        connection.query(sqlUrl, (error, results) => {
            if (error) {
                console.error('Datenbank fehler', error);
            } else if (results.length > 0) {
                console.log('Url bereits vorhanden.');
            } else {
                // Wenn die URL nicht vorhanden ist, werden die Daten in die CPU-Tabelle eingefügt
                console.log("Import ist möglich ****");

                const sqlCpu = `INSERT INTO CPU (artikelnummer, url, sockel, anzahlKerne, stromverbrauch, taktfrequenz, interneGrafik, threads, typ, turbo)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

                  connection.query(sqlCpu, valuesCpu, (error, resultat) => {
                    if (error) {
                        console.error('Fehler beim Einfügen der Daten in CPU:', error);
                    } else {
                        console.log('Objekt erfolgreich eingefügt, ID:', resultat.insertId);
                    }
                });
            }
        });
    }
}
        
// Die anderen Funktionen wie insertDataIntoRAM2, insertDataIntoGrafikkarte2 usw. haben eine ähnliche Struktur und sind jeweils für die Datenbanktabellen entsprechend ihrer Kategorie zuständig
// Funktion zum Einfügen in die RAM-Tabelle
function insertDataIntoRAM2(connection, scrapedData) {
  for (const scrapedProductData of scrapedData) {
      const valuesRam = [
          null,  
          scrapedProductData.typ,
          scrapedProductData.kapazitaet,
          scrapedProductData.latency,
          scrapedProductData.url,
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
}

// Funktion zum Einfügen in die Gehäuse-Tabelle
function insertDataIntoGehäuse2(connection, scrapedData) {
    for (const scrapedProductData of scrapedData) {
        const valuesGehäuse = [
            null, 
            scrapedProductData.formfaktor,
            scrapedProductData.frontAnschlüsse,
            scrapedProductData.abmessungen,
            scrapedProductData.url, 
            scrapedProductData.typ,
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

                const sqlGehäuse = `INSERT INTO Gehäuse (artikelnummer, formfaktor, frontAnschlüsse, abmessungen, url, typ, gewicht)
                  VALUES (?, ?, ?, ?, ?, ?, ?)`;

                  connection.query(sqlGehäuse, valuesGehäuse, (error, resultat) => {
                    if (error) {
                        console.error('Fehler beim Einfügen der Daten in Gehäuse:', error);
                    } else {
                        console.log('Objekt erfolgreich eingefügt, ID:', resultat.insertId);
                    }
                });
            }
        });
    }
}

// Funktion zum Einfügen in die Festplatte-Tabelle
function insertDataIntoFestplatte2(connection, scrapedData) {
    for (const scrapedProductData of scrapedData) {
        const valuesFestplatte = [
            null,  
            scrapedProductData.typ,
            scrapedProductData.kapazitaet,
            scrapedProductData.lesen,
            scrapedProductData.schreiben, 
            scrapedProductData.url,
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

                  connection.query(sqlFestplatte, valuesFestplatte, (error, resultat) => {
                    if (error) {
                        console.error('Fehler beim Einfügen der Daten in Festplatte:', error);
                    } else {
                        console.log('Objekt erfolgreich eingefügt, ID:', resultat.insertId);
                    }
                });
            }
        });
    }
}

// Funktion zum Einfügen in die Grafikkarte-Tabelle
function insertDataIntoGrafikkarte2(connection, scrapedData) {
    for (const scrapedProductData of scrapedData) {
        const valuesGrafikkarte = [
            null,  
            scrapedProductData.kapazitaet,
            scrapedProductData.model,
            scrapedProductData.stromverbrauch,
            scrapedProductData.url,
            scrapedProductData.streamCpu,
        ];
  
        const sqlUrl = `SELECT * FROM CPU WHERE url = "${scrapedProductData.url}"`;
  
        connection.query(sqlUrl, (error, results) => {
            if (error) {
                console.error('Datenbank fehler', error);
            } else if (results.length > 0) {
                console.log('Url bereits vorhanden.');
            } else {
                console.log("Import ist möglich ****");
  
                const sqlGrafikkarte = `INSERT INTO Grafikkarte (artikelnummer, kapazitaet, model, verbrauch, url, streamProzessoren)
                  VALUES (?, ?, ?, ?, ?, ?)`;
  
                  connection.query(sqlGrafikkarte, valuesGrafikkarte, (error, resultat) => {
                    if (error) {
                        console.error('Fehler beim Einfügen der Daten in Grafikkarte:', error);
                    } else {
                        console.log('Objekt erfolgreich eingefügt, ID:', resultat.insertId);
                    }
                });
            }
        });
    }
  }

  // Funktion zum Einfügen in die Mainboard-Tabelle
  function insertDataIntoMainboard2(connection, scrapedData) {
    for (const scrapedProductData of scrapedData) {
        const valuesMainboard = [
            null,  
            scrapedProductData.chipsatz,
            scrapedProductData.sockel,
            scrapedProductData.anzahl,
            scrapedProductData.maximal,
            scrapedProductData.url,
            scrapedProductData.formfaktor,
            scrapedProductData.speicher,
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
  
                  connection.query(sqlMainboard, valuesMainboard, (error, resultat) => {
                    if (error) {
                        console.error('Fehler beim Einfügen der Daten in Mainboard:', error);
                    } else {
                        console.log('Objekt erfolgreich eingefügt, ID:', resultat.insertId);
                    }
                });
            }
        });
    }
  }

  // Funktion zum Einfügen in die Netzteil-Tabelle
  function insertDataIntoNetzteil2(connection, scrapedData) {
    for (const scrapedProductData of scrapedData) {
        const valuesNetzteil = [
            null,  
            scrapedProductData.bauform,
            scrapedProductData.url,
            scrapedProductData.zertifizierung,
            scrapedProductData.leistung,
            scrapedProductData.abmessungen,
        ];
  
        const sqlUrl = `SELECT * FROM Netzteil WHERE url = "${scrapedProductData.url}"`;
  
        connection.query(sqlUrl, (error, results) => {
            if (error) {
                console.error('Datenbank fehler', error);
            } else if (results.length > 0) {
                console.log('Url bereits vorhanden.');
            } else {
                console.log("Import ist möglich ****");
  
                const sqlNetzteil = `INSERT INTO Netzteil (artikelnummer, bauform, url, zertifizierung, leistung, abmessungen)
                  VALUES (?, ?, ?, ?, ?, ?)`;
  
                  connection.query(sqlNetzteil, valuesNetzteil, (error, resultat) => {
                    if (error) {
                        console.error('Fehler beim Einfügen der Daten in Netzteil:', error);
                    } else {
                        console.log('Objekt erfolgreich eingefügt, ID:', resultat.insertId);
                    }
                });
            }
        });
    }
  }
  

// Export der verschiedenen Funktionen, um sie in anderen Dateien verwenden zu können
module.exports = {
    insertDataIntoArtikel2, // Funktion zum Einfügen von Daten in die Artikel-Tabelle
    insertDataIntoKomponenten, // Funktion zum Einfügen von Daten in die Komponenten-Tabelle basierend auf der Kategorie
    insertDataIntoCPU2, // Funktion zum Einfügen von CPU-Daten
    insertDataIntoRAM2, // Funktion zum Einfügen von RAM-Daten
    insertDataIntoGehäuse2, // Funktion zum Einfügen von Gehäuse-Daten
    insertDataIntoFestplatte2, // Funktion zum Einfügen von Festplatten-Daten
    insertDataIntoGrafikkarte2, // Funktion zum Einfügen von Grafikkarten-Daten
    insertDataIntoMainboard2, // Funktion zum Einfügen von Mainboard-Daten
    insertDataIntoNetzteil2 // Funktion zum Einfügen von Netzteil-Daten
};
