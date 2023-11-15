const { scheduled } = require("rxjs");

class Prozessor{
    constructor(shopID, kategorie, bezeichnung, preis, deliveryDate, produktLink, marke, imgUrl, 
        CPUTyp, sockel, kerne, threads, taktfrequenz, interneGrafik, stromverbrauch, maxTurboTaktfrequenz) {

        this.shopID = shopID;
        this.kategorie = kategorie;
        this.bezeichnung = bezeichnung;
        this.preis = preis; 
        this.deliveryDate = deliveryDate; 
        this.produktlink = produktLink;
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
    constructor(shopID, kategorie, bezeichnung, preis, lieferDatum, produktLink, marke,imgUrl,
                    frontanschluesse, breite, tiefe, hoehe, gewicht, mainboardFormfaktor, produkttyp) {
        
        this.shopID = shopID;
        this.kategorie = kategorie;
        this.bezeichnung = bezeichnung;
        this.preis = preis; 
        this.lieferDatum = lieferDatum; 
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
        formfaktor, chipsatz, sockel, unterstuetzterSpeichertyp, maximalSpeicher, imgUrl) {
        
        this.shopID = shopID;
        this.kategorie = kategorie;
        this.bezeichnung = bezeichnung;
        this.preis = preis; 
        this.deliveryDate = deliveryDate; 
        this.produktlink = produktLink;
        this.marke = marke;
        this.imgUrl = imgUrl;

        this.formfaktor = formfaktor;
        this.chipsatz = chipsatz;
        this.sockel = sockel;
        this.unterstuetzterSpeichertyp = unterstuetzterSpeichertyp;
        this.maximalSpeicher = maximalSpeicher;
        
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
        this.produktlink = produktlink;
        this.marke = marke;
        this.typ = typ;

        this.kapazitaet = kapazitaet; 
        this.spannung = spannung; 
        this.latency = latency;
        this.imgUrl= imgUrl; 
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
                    imgUrl, marke, typ, speicherKapazitaet, Grafikprozessor, durchschnittlicherVerbrauch, streamprozessorenAnzahl){
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
        imgUrl, marke, leistungskapazitaet, formfaktor){ 

        this.shopID = shopID;
        this.kategorie = kategorie;
        this.bezeichnung = bezeichnung;
        this.preis = preis; 
        this.deliveryDate = deliveryDate; 
        this.produktlink = produktLink;
        this.marke = marke;
        this.imgUrl = imgUrl;

        this.leistungskapazitaet = leistungskapazitaet; 
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
