const { scheduled } = require("rxjs");

class Prozessor{
    constructor(shopID, kategorie, bezeichnung, preis, deliveryDate, produktlink, marke, imgUrl, verfuegbarkeit,
        CPUTyp, sockel, kerne, threads, taktfrequenz, interneGrafik, stromverbrauch, maxTurboTaktfrequenz) {

        this.shopID = shopID;
        this.kategorie = kategorie;
        this.bezeichnung = bezeichnung;
        this.preis = preis; 
        this.deliveryDate = deliveryDate; 
        this.produktlink = produktlink;
        this.marke = marke;
        this.imgUrl = imgUrl;
        this.verfuegbarkeit = verfuegbarkeit;

        this.CPUTyp = CPUTyp;
        this.sockel = sockel;
        this.kerne = kerne;
        this.threads = threads;
        this.taktfrequenz = taktfrequenz;
        this.interneGrafik = interneGrafik;
        this.stromverbrauch = stromverbrauch;
        this.maxTurboTaktfrequenz = maxTurboTaktfrequenz;
   }
}

class Gehaeuse {
    constructor(shopID, kategorie, bezeichnung, preis, deliveryDate, produktLink, marke, imgUrl, verfuegbarkeit,
                    frontanschluesse, breite, tiefe, hoehe, gewicht, mainboardFormfaktor, produkttyp) {
        this.abmessung = "";
        this.shopID = shopID;
        this.kategorie = kategorie;
        this.bezeichnung = bezeichnung;
        this.preis = preis; 
        this.deliveryDate = deliveryDate; 
        this.produktlink = produktLink;
        this.marke = marke;
        this.imgUrl = imgUrl;
        this.verfuegbarkeit = verfuegbarkeit;

        this.breite = breite;
        this.hoehe = hoehe;
        this.tiefe = tiefe;
        this.gewicht = gewicht;
        this.frontanschluesse = frontanschluesse; //
        this.mainboardFormfaktor = mainboardFormfaktor //
        this.produkttyp = produkttyp; //
    }
}

class Mainboard{
    constructor(shopID, kategorie, bezeichnung, preis, deliveryDate, produktLink, marke, imgUrl, verfuegbarkeit,
        formfaktor, chipsatz, sockel, anzahlSpeichersockel, unterstuetzterSpeichertyp, maximalSpeicher) {
        
        this.shopID = shopID;
        this.kategorie = kategorie;
        this.bezeichnung = bezeichnung;
        this.preis = preis; 
        this.deliveryDate = deliveryDate; 
        this.marke = marke;
        this.imgUrl = imgUrl;
        this.verfuegbarkeit = verfuegbarkeit;

        this.chipsatz = chipsatz;
        this.sockel = sockel;
        this.anzahlSpeichersockel = anzahlSpeichersockel;
        this.maximalSpeicher = maximalSpeicher;
        this.produktlink = produktLink;
        this.formfaktor = formfaktor;
        this.unterstuetzterSpeichertyp = unterstuetzterSpeichertyp;
    }
}

class Arbeitsspeicher{
    constructor(shopID, kategorie, bezeichnung, preis, deliveryDate, produktlink, marke, verfuegbarkeit,
                                typ, kapazitaet, spannung, latency, imgUrl){
        this.shopID = shopID;
        this.kategorie = kategorie;
        this.bezeichnung = bezeichnung;
        this.preis = preis; 
        this.deliveryDate = deliveryDate; 
        this.marke = marke;
        this.imgUrl= imgUrl; 
        this.verfuegbarkeit = verfuegbarkeit;

        this.typ = typ;
        this.kapazitaet = kapazitaet; 
        this.latency = latency;
        this.produktlink = produktlink;
        this.spannung = spannung;
    }
}

class Festplatte{
    constructor(shopID, kategorie, bezeichnung, preis, deliveryDate, produktlink, marke, imgUrl, verfuegbarkeit,
                        typ, kapazitaet, energieverbrauch, lesen, schreiben){
        
        this.shopID = shopID;
        this.kategorie = kategorie;
        this.bezeichnung = bezeichnung;
        this.preis = preis; 
        this.deliveryDate = deliveryDate; 
        this.produktlink = produktlink;
        this.marke = marke; 
        this.imgUrl = imgUrl;
        this.verfuegbarkeit = verfuegbarkeit;

        this.typ = typ;
        this.kapazitaet = kapazitaet; 
        this.energieverbrauch = energieverbrauch
        this.lesen = lesen,
        this.schreiben = schreiben;
    }
}

class Grafikkarte{
    constructor(shopID, kategorie, bezeichnung, preis, deliveryDate, produktLink, verfuegbarkeit,
                    imgUrl, marke, speicherKapazitaet, Grafikprozessor, durchschnittlicherVerbrauch, streamprozessorenAnzahl){
        this.shopID = shopID;
        this.kategorie = kategorie;
        this.bezeichnung = bezeichnung;
        this.preis = preis; 
        this.deliveryDate = deliveryDate; 
        this.produktlink = produktLink;
        this.marke = marke;
        this.imgUrl = imgUrl;
        this.verfuegbarkeit = verfuegbarkeit;

        this.speicherKapazitaet = speicherKapazitaet;
        this.grafikprozessor = Grafikprozessor;
        this.durchschnittlicherVerbrauch = durchschnittlicherVerbrauch;
        this.streamprozessorenAnzahl = streamprozessorenAnzahl;
    }
}

class Netzteil {
    constructor(shopID, kategorie, bezeichnung, preis, deliveryDate, produktLink, verfuegbarkeit,
        bauForm, zertifizierung, imgUrl, marke, leistung, formfaktor){ 

        this.shopID = shopID;
        this.kategorie = kategorie;
        this.bezeichnung = bezeichnung;
        this.preis = preis; 
        this.deliveryDate = deliveryDate; 
        this.marke = marke;
        this.imgUrl = imgUrl;
        this.verfuegbarkeit = verfuegbarkeit;

        this.leistung = leistung; 
        this.bauForm = bauForm;
        this.produktlink = produktLink;
        this.zertifizierung = zertifizierung;
        this.formfaktor = formfaktor;
    }
}

module.exports = {
    Prozessor,
    Gehaeuse,
    Mainboard,
    Grafikkarte,
    Festplatte,
    Netzteil,
    Arbeitsspeicher
};
