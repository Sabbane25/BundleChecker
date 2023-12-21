import { Artikel } from "./artikel.model";
import { Filter } from "./filter.models";

export class Gehaeuse extends Artikel{
    artikelnummer: number;
    formfaktor: string;
    frontenschluesse: string;
    abmessungen: string;
    typ: string;
    gewicht: number;
    //[cle: string]: any; //neu

    constructor(kategorie: string, preis: number, shopID: number, produktLink: string, bezeichnung: string, lieferDatum: number, marke: string, bildUrl: string, verfuegbarkeit: string,
        artikelnummer: number, formfaktor: string, frontenschluesse: string, abmessungen: string, typ: string, gewicht: number) {

        super(kategorie, preis, shopID, produktLink, bezeichnung, lieferDatum, marke, bildUrl, verfuegbarkeit)
        this.artikelnummer = artikelnummer;
        this.formfaktor = formfaktor;
        this.frontenschluesse = frontenschluesse;
        this.abmessungen = abmessungen;
        this.typ = typ;
        this.gewicht = gewicht;
        this.verfuegbarkeit = verfuegbarkeit; 
    }

    override gibArtikelTitel(): string {
        return `${this.marke}`;
    }

    override gibArtikelBeschreibung(): string {
        return `${this.frontenschluesse} • ${this.formfaktor} • ${this.typ} • ${this.abmessungen}`;
    }

    /*override getSpezifischeAttribute(): string {
        return `Marke: ${this.marke}, Modell: ${this.typ}, Frontanschlüsse: ${this.frontenschluesse}, Mainboard Formfaktor: ${this.formfaktor}, Abmessungen: ${this.abmessungen}`;
    }*/

    /**
     * Filtert eine Liste von Objekten, die jeweils zwei Artikel (shop1 und shop2) enthalten,
     * und gibt eine gefilterte Liste von Gehäuse-Objekten zurück.
     * @param arr Eine Liste von Objekten, die jeweils zwei Artikel-Instanzen (shop1 und shop2) enthalten.
     * @param kriterium Das Filterobjekt, das die Kriterien enthält.
     * @returns Eine gefilterte Liste von Objekten, die jeweils zwei Gehäuse-Instanzen enthalten.
     */
    static filterByMapCriteria(arr: Array<{ shop1: Artikel, shop2: Artikel }>, kriterium: Filter): Array<{ shop1: Artikel, shop2: Artikel }> {
        let listeCpu: Array<{ shop1: Gehaeuse, shop2: Gehaeuse }> = [];

        for (const artikel of arr) {
            if (artikel.shop1 instanceof Gehaeuse && artikel.shop2 instanceof Gehaeuse) {
                listeCpu.push({ shop1: artikel.shop1, shop2: artikel.shop2 });
            }
        }
        return listeCpu.filter(item => this.filterKrierien(item, kriterium));
    }
}