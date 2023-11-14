import { Artikel } from "./artikel.model";

export class Cpu extends Artikel{
    
    bezeichnung: string;
    stromverbrauch: number;
    taktfrequenz: string;
    sockel: string;
    anzahlKerne: number;
    interneGrafik: string;

    constructor(artikelnummer: number, kategorie: string, preis: number, shopID: number, bezeichnung: string, produktLink: string, stromverbrauch: number, taktfrequenz: string, sockel: string, anzahlKerne: number, interneGrafik: string) {

        super(artikelnummer, kategorie, preis, shopID, produktLink)
        this.bezeichnung = bezeichnung;
        this.stromverbrauch = stromverbrauch;
        this.taktfrequenz = taktfrequenz;
        this.sockel = sockel; 
        this.anzahlKerne = anzahlKerne;
        this.interneGrafik = interneGrafik; 
    }


    override getSpezifischeAttribute(): string {
        return `Bezeichnung: ${this.bezeichnung}, 
        Stromverbrauch: ${this.stromverbrauch}, Taktfrequenz: ${this.taktfrequenz}, 
        Sockel: ${this.sockel}, Anzahl Kerne: ${this.anzahlKerne}, 
        Interne Grafik: ${this.interneGrafik}`;
      }

    /** 
    override gibArtikelTitel(): string {
        return `${this.marke}`;
    }

    override gibArtikelBeschreibung(): string {
        return `${this.modell} - ${this.stromverbrauch} - ${this.taktfrequenz} - ${this.sockel} - ${this.anzahlKerne} - ${this.interneGrafik}`;
    }
    
    override getSpezifischeAttribute(): string {
        return `Marke: ${this.marke}, Modell: ${this.modell}, 
        Stromverbrauch: ${this.stromverbrauch}, Taktfrequenz: ${this.taktfrequenz}, 
        Sockel: ${this.sockel}, Anzahl Kerne: ${this.anzahlKerne}, 
        Interne Grafik: ${this.interneGrafik}`;
      }

    */
}