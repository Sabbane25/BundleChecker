import { Artikel } from "./artikel.model";

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
}