import { Artikel } from "./artikel.model";
import { Filter } from "./filter.models";

export class Netzteil extends Artikel{
    artikelnummer: number;
    bauform: string;
    zertifizierung: string;
    leistung: number;

    constructor(kategorie: string, preis: number, shopID: number, produktLink: string, bezeichnung: string, lieferDatum: number, marke: string, bildUrl: string,
        artikelnummer: number, bauform: string, zertifizierung: string, leistung: number) {

        super(kategorie, preis, shopID, produktLink, bezeichnung, lieferDatum, marke, bildUrl)
        this.artikelnummer = artikelnummer;
        this.bauform = bauform;
        this.zertifizierung = zertifizierung;
        this.leistung = leistung;
    }

    override gibArtikelBeschreibung(): string {
        return "";
    }
    
    override gibArtikelTitel(): string {
        return "";
    }

    /**
     * Filtert eine Liste von Objekten, die jeweils zwei Artikel (shop1 und shop2) enthalten, 
     * und gibt eine gefilterte Liste von Objekten zurück.
     * @param arr Eine Liste von Objekten, die jeweils zwei Artikel-Instanzen (shop1 und shop2) enthalten.
     * @param kriterium Das Filterobjekt, das die Kriterien enthält.
     * @returns Eine gefilterte Liste von Objekten, die jeweils zwei Instanzen enthalten.
     */
    static filterByMapCriteria(arr: Array<{ shop1: Artikel, shop2: Artikel }>, kriterium: Filter): Array<{ shop1: Artikel, shop2: Artikel }> {
        let listeCpu: Array<{ shop1: Netzteil, shop2: Netzteil }> = [];

        for (const artikel of arr) {
            if (artikel.shop1 instanceof Netzteil && artikel.shop2 instanceof Netzteil) {
                listeCpu.push({ shop1: artikel.shop1, shop2: artikel.shop2 });
            }
        }
        return listeCpu.filter(item => this.filterKrierien(item, kriterium));
    }
}