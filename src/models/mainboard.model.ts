import { Artikel } from "./artikel.model";

export class Mainboard extends Artikel{
    marke: string;
    modell: string;
    anschluesseExtern: number;
    anschluesseIntern: string;
    chipsatz: string;
    anzahlSpeichersockel: string;
    maxRam: string;

    constructor(artikelnummer: number, kategorie: string, preis: number, shopID: number, produktLink: string, anbieter: string,
        marke: string, modell: string, frontenschluesse: number, anschluesseIntern: string, chipsatz: string, anzahlSpeichersockel: string, maxRam: string) {
        super(artikelnummer, kategorie, preis,  shopID, produktLink, anbieter)
        this.marke = marke;
        this.modell = modell;
        this.anschluesseExtern = frontenschluesse;
        this.anschluesseIntern= anschluesseIntern;
        this.chipsatz = chipsatz;
        this.anzahlSpeichersockel = anzahlSpeichersockel;
        this.maxRam = maxRam;
    }

    override gibArtikelBeschreibung(): string {
        return `${this.modell} • ${this.modell} • ${this.anschluesseExtern} • ${this.anschluesseIntern} • ${this.chipsatz} 
        • ${this.anzahlSpeichersockel} • ${this.maxRam}}`; 
    }
    override gibArtikelTitel(): string {
        return `${this.marke}`;
    }

}