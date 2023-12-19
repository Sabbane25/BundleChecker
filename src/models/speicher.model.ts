import { Artikel } from "./artikel.model";
import { Filter } from "./filter.models";

export class Speicher extends Artikel{
    artikelnummer: number;
    typ: string;
    kapazitaet: string;
    lesen: number;
    schreiben: number;
    [cle: string]: any; //neu

    constructor(kategorie: string, preis: number, shopID: number, produktLink: string, bezeichnung: string, lieferDatum: number, marke: string, bildUrl: string,
        artikelnummer: number, typ: string, kapazitaet: string, lesen: number, schreiben: number) {

        super(kategorie, preis, shopID, produktLink, bezeichnung, lieferDatum, marke, bildUrl)
        this.artikelnummer = artikelnummer;
        this.typ = typ;
        this.kapazitaet = kapazitaet;
        this.lesen = lesen;
        this.schreiben = schreiben;
    }

    override gibArtikelTitel(): string {
        return `${this.typ}`;
    }

    override gibArtikelBeschreibung(): string {
        return `${this.typ} • ${this.kapazitaet} • ${this.schreiben} • ${this.lesen}`;
    }

    static filterByMapCriteria(arr: Array<{ shop1: Artikel, shop2: Artikel }>, kriterium: Filter): Array<{ shop1: Artikel, shop2: Artikel }> {
        let listeCpu: Array<{ shop1: Speicher, shop2: Speicher }> = [];

        for (const artikel of arr) {
            if (artikel.shop1 instanceof Speicher && artikel.shop2 instanceof Speicher) {
                listeCpu.push({ shop1: artikel.shop1, shop2: artikel.shop2 });
            }
        }
        return arr.filter(item => this.filterKrierien(item, kriterium));
    }
}
