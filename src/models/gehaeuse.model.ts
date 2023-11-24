import { Artikel } from "./artikel.model";

export class Gehaeuse extends Artikel{
    artikelnummer: number;
    formfaktor: string;
    frontenschluesse: string;
    abmessungen: string;
    typ: string;
    gewicht: number;

    constructor(kategorie: string, preis: number, shopID: number, produktLink: string, bezeichnung: string, lieferDatum: number, marke: string, bildUrl: string,
        artikelnummer: number, formfaktor: string, frontenschluesse: string, abmessungen: string, typ: string, gewicht: number) {

        super(kategorie, preis, shopID, produktLink, bezeichnung, lieferDatum, marke, bildUrl)
        this.artikelnummer = artikelnummer;
        this.formfaktor = formfaktor;
        this.frontenschluesse = frontenschluesse;
        this.abmessungen = abmessungen;
        this.typ = typ;
        this.gewicht = gewicht;
    }

    override gibArtikelTitel(): string {
        return `${this.marke}`;
    }

    override gibArtikelBeschreibung(): string {
        return `${this.frontenschluesse} • ${this.formfaktor} • ${this.typ} • ${this.abmessungen}`;
    }

    override getSpezifischeAttribute(): string {
        return `Marke: ${this.marke}, Modell: ${this.typ}, Frontanschlüsse: ${this.frontenschluesse}, Mainboard Formfaktor: ${this.formfaktor}, Abmessungen: ${this.abmessungen}`;
    }
}