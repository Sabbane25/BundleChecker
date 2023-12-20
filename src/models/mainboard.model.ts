import { Artikel } from "./artikel.model";
import { Filter } from "./filter.models";

export class Mainboard extends Artikel{
    artikelnummer: number;
    chipsatz: string;
    sockel: string;
    anzahlSpeichersockel: number;
    maxRam: number;
    formfaktor: string;
    speicherTyp: string;
    //[cle: string]: any; //neu

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

    static filterByMapCriteria(arr: Array<{ shop1: Artikel, shop2: Artikel }>, kriterium: Filter): Array<{ shop1: Artikel, shop2: Artikel }> {
        let listeCpu: Array<{ shop1: Mainboard, shop2: Mainboard }> = [];

        for (const artikel of arr) {
            if (artikel.shop1 instanceof Mainboard && artikel.shop2 instanceof Mainboard) {
                listeCpu.push({ shop1: artikel.shop1, shop2: artikel.shop2 });
            }
        }
        return listeCpu.filter(item => this.filterKrierien(item, kriterium));
    }
}