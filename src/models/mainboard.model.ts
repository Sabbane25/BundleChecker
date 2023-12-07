import { Artikel } from "./artikel.model";

export class Mainboard extends Artikel{
    artikelnummer: number;
    chipsatz: string;
    sockel: string;
    anzahlSpeichersockel: number;
    maxRam: number;
    formfaktor: string;
    speicherTyp: string;

    constructor(kategorie: string, preis: number, shopID: number, produktLink: string, bezeichnung: string, lieferDatum: number, marke: string, bildUrl: string,
        artikelnummer: number, chipsatz: string, sockel: string, anzahlSpeichersockel: number, maxRam: number, formfaktor: string, speicherTyp: string) {

        super(kategorie, preis, shopID, produktLink, bezeichnung, lieferDatum, marke, bildUrl)
        this.artikelnummer = artikelnummer;
        this.chipsatz = chipsatz;
        this.sockel = sockel;
        this.anzahlSpeichersockel = anzahlSpeichersockel;
        this.maxRam= maxRam;
        this.formfaktor = formfaktor;
        this.speicherTyp = speicherTyp;
    }

    override gibArtikelBeschreibung(): string {
        return `${this.maxRam} • ${this.chipsatz} • ${this.speicherTyp} • ${this.speicherTyp} } 
        • ${this.anzahlSpeichersockel} • ${this.maxRam}}`; 
    }
    override gibArtikelTitel(): string {
        return `${this.marke}`;
    }
}