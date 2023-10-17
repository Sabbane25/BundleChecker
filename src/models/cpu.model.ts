import { Artikel } from "./artikel.model";

export class Cpu extends Artikel{
    
    marke: string;
    modell: string;
    stromverbrauch: string;
    taktfrequenz: string;
    sockel: string;
    anzahlKerne: string;
    interneGrafik: string;

    constructor(artikelnummer: number, kategorie: string, preis: number, shopID: number, produktLink: string, anbieter: string, marke: string, 
        modell: string, stromverbrauch: string, taktfrequenz: string, sockel: string, anzahlKerne: string, interneGrafik: string) {

        super(artikelnummer, kategorie, preis,  shopID, produktLink, anbieter)
        this.marke = marke;
        this.modell = modell;
        this.stromverbrauch = stromverbrauch;
        this.taktfrequenz = taktfrequenz;
        this.sockel = sockel; 
        this.anzahlKerne = anzahlKerne;
        this.interneGrafik = interneGrafik; 
    }

}