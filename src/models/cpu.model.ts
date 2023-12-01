import { Artikel } from "./artikel.model";

export class Cpu extends Artikel{
    artikelnummer: number;
    sockel: string;
    anzahlKerne: number;
    stromverbrauch: number;
    taktfrequenz: string;
    interneGrafik: string;
    threads: number;
    typ: string;
    turbo: number;

    constructor(kategorie: string, preis: number, shopID: number, produktUrl: string, bezeichnung: string, lieferDatum: number, marke: string, image: string,
        artikelnummer: number, sockel: string, anzahlKerne: number, stromverbrauch: number, taktfrequenz: string, interneGrafik: string, threads: number, typ: string, turbo: number) {

        super(kategorie, preis, shopID, produktUrl, bezeichnung, lieferDatum, marke, image)
        this.artikelnummer = artikelnummer;
        this.sockel = sockel;
        this.anzahlKerne = anzahlKerne;
        this.stromverbrauch = stromverbrauch;
        this.taktfrequenz = taktfrequenz;
        this.interneGrafik = interneGrafik;
        this.threads = threads;
        this.typ = typ;
        this.turbo = turbo;
    }


    override getSpezifischeAttribute(): string {
        return `Bezeichnung: ${this.bezeichnung}, 
        Stromverbrauch: ${this.stromverbrauch}, Taktfrequenz: ${this.taktfrequenz}, 
        Sockel: ${this.sockel}, Anzahl Kerne: ${this.anzahlKerne}, 
        Interne Grafik: ${this.interneGrafik}`;
      }


    override gibArtikelTitel(): string {
        return `${this.marke}`;
    }

    override gibArtikelBeschreibung(): string {
        return `${this.typ} - ${this.stromverbrauch} - ${this.taktfrequenz} - ${this.sockel} - ${this.anzahlKerne} - ${this.interneGrafik}`;
    }
}
