const { scheduled } = require("rxjs");

class Prozessor{
    constructor(shopID, kategorie, bezeichnung, preis, deliveryDate, produktlink, marke, imgUrl, 
        CPUTyp, sockel, kerne, threads, taktfrequenz, interneGrafik, stromverbrauch, maxTurboTaktfrequenz) {

        this.shopID = shopID;
        this.kategorie = kategorie;
        this.bezeichnung = bezeichnung;
        this.preis = preis; 
        this.deliveryDate = deliveryDate; 
        this.produktlink = produktlink;
        this.marke = marke;
        this.imgUrl = imgUrl;

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
    constructor(shopID, kategorie, bezeichnung, preis, deliveryDate, produktLink, marke,imgUrl,
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
    constructor(shopID, kategorie, bezeichnung, preis, deliveryDate, produktLink, marke, 
        formfaktor, chipsatz, sockel, anzahlSpeichersockel, unterstuetzterSpeichertyp, maximalSpeicher, imgUrl) {
        
        this.shopID = shopID;
        this.kategorie = kategorie;
        this.bezeichnung = bezeichnung;
        this.preis = preis; 
        this.deliveryDate = deliveryDate; 
        this.marke = marke;
        this.imgUrl = imgUrl;

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
    constructor(shopID, kategorie, bezeichnung, preis, deliveryDate, produktlink, marke, 
                                typ, kapazitaet, spannung, latency, imgUrl){
        this.shopID = shopID;
        this.kategorie = kategorie;
        this.bezeichnung = bezeichnung;
        this.preis = preis; 
        this.deliveryDate = deliveryDate; 
        this.marke = marke;
        this.imgUrl= imgUrl; 

        this.typ = typ;
        this.kapazitaet = kapazitaet; 
        this.latency = latency;
        this.produktlink = produktlink;
        this.spannung = spannung;
    }
}

class Festplatte{
    constructor(shopID, kategorie, bezeichnung, preis, deliveryDate, produktlink, marke, imgUrl, typ, kapazitaet, energieverbrauch, lesen, schreiben){
        
        this.shopID = shopID;
        this.kategorie = kategorie;
        this.bezeichnung = bezeichnung;
        this.preis = preis; 
        this.deliveryDate = deliveryDate; 
        this.produktlink = produktlink;
        this.marke = marke; 
        this.imgUrl = imgUrl;

        this.typ = typ;
        this.kapazitaet = kapazitaet; 
        this.energieverbrauch = energieverbrauch
        this.lesen = lesen,
        this.schreiben = schreiben;
    }
}

class Grafikkarte{
    constructor(shopID, kategorie, bezeichnung, preis, deliveryDate, produktLink, 
                    imgUrl, marke, speicherKapazitaet, Grafikprozessor, durchschnittlicherVerbrauch, streamprozessorenAnzahl){
        this.shopID = shopID;
        this.kategorie = kategorie;
        this.bezeichnung = bezeichnung;
        this.preis = preis; 
        this.deliveryDate = deliveryDate; 
        this.produktlink = produktLink;
        this.marke = marke;
        this.imgUrl = imgUrl;

        this.speicherKapazitaet = speicherKapazitaet;
        this.grafikprozessor = Grafikprozessor;
        this.durchschnittlicherVerbrauch = durchschnittlicherVerbrauch;
        this.streamprozessorenAnzahl = streamprozessorenAnzahl;
    }
}

class Netzteil {
    constructor(shopID, kategorie, bezeichnung, preis, deliveryDate, produktLink,
        bauForm, zertifizierung, imgUrl, marke, leistung, formfaktor){ 

        this.shopID = shopID;
        this.kategorie = kategorie;
        this.bezeichnung = bezeichnung;
        this.preis = preis; 
        this.deliveryDate = deliveryDate; 
        this.marke = marke;
        this.imgUrl = imgUrl;

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
