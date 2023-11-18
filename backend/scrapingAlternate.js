const mysql = require('mysql2');


function insertDataIntoKomponenten(connection, scrapedData){
    for (const scrapedProductData of scrapedData) {
          switch (scrapedProductData.category) {
            case 'Arbeitsspeicher':
                insertDataIntoRAM2(connection, scrapedData);
              break;
            case 'Prozessor':
                insertDataIntoCPU2(connection, scrapedData);
                break;
            case 'Gehäuse':
                insertDataIntoGehaeuse2(connection, scrapedData);
                break;
            case 'Solid State Drive' || 'SATA':
                insertDataIntoFestplatte2(connection, scrapedData);
                break;
            case 'Grafikkarte':
                insertDataIntoGrafikkarte2(connection, scrapedData);
                break;
            case 'Mainboard':
                insertDataIntoMainboard2(connection, scrapedData);
                    break;
            case 'PC-Netzteil':
                insertDataIntoNetzteil2(connection, scrapedData);
                    break;
    }   
}
}

function insertDataIntoArtikel2(connection, scrapedData) {
    for (const scrapedProductData of scrapedData) {
      const sqlArtikel = `INSERT INTO Artikel(Kategorie, Preis, ShopID, ProduktUrl, Bezeichnung, LieferDatum, Marke, Image)
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                          ON DUPLICATE KEY UPDATE Preis = VALUES(Preis), LieferDatum = VALUES(LieferDatum)`;
  
      const valuesArtikel = [
        scrapedProductData.category,
        scrapedProductData.price,
        scrapedProductData.shopID,
        scrapedProductData.url,
        scrapedProductData.productName,
        scrapedProductData.deliveryDate,
        scrapedProductData.marke,
        scrapedProductData.image
      ];
  
      connection.query(sqlArtikel, valuesArtikel, (error, results) => {
        if (error) {
            console.error('Error inserting data into Artikel:', error);
        } else {
            console.log('Object inserted successfully, ID:', results.insertId);
        }
    });
  }
}


  function insertDataIntoCPU2(connection, scrapedData) {
    for (const scrapedProductData of scrapedData) {
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

        const sqlUrl = `SELECT * FROM CPU WHERE Url = "${scrapedProductData.url}"`;

        connection.query(sqlUrl, (error, results) => {
            if (error) {
                console.error('Datenbank fehler', error);
            } else if (results.length > 0) {
                console.log('Url bereits vorhanden.');
            } else {
                console.log("L'insertion est possible ****");

                const sqlCpu = `INSERT INTO CPU (Artikelnummer, Url, Sockel, AnzahlKerne, Stromverbrauch, Taktfrequenz, InterneGrafik, Threads, Typ, Turbo)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

                  connection.query(sqlCpu, valuesCpu, (error, resultat) => {
                    if (error) {
                        console.error('Error inserting data into CPU:', error);
                    } else {
                        console.log('Object inserted successfully, ID:', resultat.insertId);
                    }
                });
            }
        });
    }
}
        

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

      const sqlUrl = `SELECT * FROM CPU WHERE Url = "${scrapedProductData.url}"`;

      connection.query(sqlUrl, (error, results) => {
          if (error) {
              console.error('Datenbank fehler', error);
          } else if (results.length > 0) {
              console.log('Url bereits vorhanden.');
          } else {
              console.log("L'insertion est possible ****");

              const sqlRam = `INSERT INTO RAM (Artikelnummer, Typ, Kapazitaet, Latency, Url, Spannung)
                VALUES (?, ?, ?, ?, ?, ?)`;

                connection.query(sqlRam, valuesRam, (error, resultat) => {
                  if (error) {
                      console.error('Error inserting data into RAM:', error);
                  } else {
                      console.log('Object inserted successfully, ID:', resultat.insertId);
                  }
              });
          }
      });
  }
}

function insertDataIntoGehaeuse2(connection, scrapedData) {
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

        const sqlUrl = `SELECT * FROM Gehäuse WHERE Url = "${scrapedProductData.url}"`;

        connection.query(sqlUrl, (error, results) => {
            if (error) {
                console.error('Datenbank fehler', error);
            } else if (results.length > 0) {
                console.log('Url bereits vorhanden.');
            } else {
                console.log("L'insertion est possible ****");

                const sqlGehäuse = `INSERT INTO Gehäuse (Artikelnummer, Formfaktor, FrontAnschlüsse, Abmessungen, Url, Typ, Gewicht)
                  VALUES (?, ?, ?, ?, ?, ?, ?)`;

                  connection.query(sqlGehäuse, valuesGehäuse, (error, resultat) => {
                    if (error) {
                        console.error('Error inserting data into Gehäuse:', error);
                    } else {
                        console.log('Object inserted successfully, ID:', resultat.insertId);
                    }
                });
            }
        });
    }
}

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

        const sqlUrl = `SELECT * FROM Festplatte WHERE Url = "${scrapedProductData.url}"`;

        connection.query(sqlUrl, (error, results) => {
            if (error) {
                console.error('Datenbank fehler', error);
            } else if (results.length > 0) {
                console.log('Url bereits vorhanden.');
            } else {
                console.log("L'insertion est possible ****");

                const sqlFestplatte = `INSERT INTO Festplatte (Artikelnummer, Typ, Kapazitaet, Lesen, Schreiben, Url)
                  VALUES (?, ?, ?, ?, ?, ?)`;

                  connection.query(sqlFestplatte, valuesFestplatte, (error, resultat) => {
                    if (error) {
                        console.error('Error inserting data into Festplatte:', error);
                    } else {
                        console.log('Object inserted successfully, ID:', resultat.insertId);
                    }
                });
            }
        });
    }
}


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
  
        const sqlUrl = `SELECT * FROM CPU WHERE Url = "${scrapedProductData.url}"`;
  
        connection.query(sqlUrl, (error, results) => {
            if (error) {
                console.error('Datenbank fehler', error);
            } else if (results.length > 0) {
                console.log('Url bereits vorhanden.');
            } else {
                console.log("L'insertion est possible ****");
  
                const sqlGrafikkarte = `INSERT INTO Grafikkarte (Artikelnummer, Kapazitaet, Model, Verbrauch, Url, StreamProzessoren)
                  VALUES (?, ?, ?, ?, ?, ?)`;
  
                  connection.query(sqlGrafikkarte, valuesGrafikkarte, (error, resultat) => {
                    if (error) {
                        console.error('Error inserting data into Grafikkarte:', error);
                    } else {
                        console.log('Object inserted successfully, ID:', resultat.insertId);
                    }
                });
            }
        });
    }
  }

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
  
        const sqlUrl = `SELECT * FROM Mainboard WHERE Url = "${scrapedProductData.url}"`;
  
        connection.query(sqlUrl, (error, results) => {
            if (error) {
                console.error('Datenbank fehler', error);
            } else if (results.length > 0) {
                console.log('Url bereits vorhanden.');
            } else {
                console.log("L'insertion est possible ****");
  
                const sqlMainboard = `INSERT INTO Mainboard (Artikelnummer, Chipsatz, Sockel, AnzahlSpeichersockel, MaxRam, Url, FormFaktor, SpeicherTyp)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  
                  connection.query(sqlMainboard, valuesMainboard, (error, resultat) => {
                    if (error) {
                        console.error('Error inserting data into Mainboard:', error);
                    } else {
                        console.log('Object inserted successfully, ID:', resultat.insertId);
                    }
                });
            }
        });
    }
  }
  function insertDataIntoNetzteil2(connection, scrapedData) {
    for (const scrapedProductData of scrapedData) {
        const valuesNetzteil = [
            null,  
            scrapedProductData.bauform,
            scrapedProductData.url,
            scrapedProductData.zertifizierung,
        ];
  
        const sqlUrl = `SELECT * FROM Netzteil WHERE Url = "${scrapedProductData.url}"`;
  
        connection.query(sqlUrl, (error, results) => {
            if (error) {
                console.error('Datenbank fehler', error);
            } else if (results.length > 0) {
                console.log('Url bereits vorhanden.');
            } else {
                console.log("L'insertion est possible ****");
  
                const sqlNetzteil = `INSERT INTO Netzteil (Artikelnummer, Bauform, Url, Zertifizierung)
                  VALUES (?, ?, ?, ?)`;
  
                  connection.query(sqlNetzteil, valuesNetzteil, (error, resultat) => {
                    if (error) {
                        console.error('Error inserting data into Netzteil:', error);
                    } else {
                        console.log('Object inserted successfully, ID:', resultat.insertId);
                    }
                });
            }
        });
    }
  }
module.exports = {
  insertDataIntoArtikel2,
  insertDataIntoKomponenten,
  insertDataIntoCPU2,
  insertDataIntoRAM2,
  insertDataIntoGehaeuse2,
  insertDataIntoFestplatte2,
  insertDataIntoGrafikkarte2,
  insertDataIntoMainboard2,
  insertDataIntoNetzteil2
};

