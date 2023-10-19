import { Artikel } from "./artikel.model";

export class BetriebsSystem extends Artikel{

    name: string;
    hersteller: string;

    constructor(artikelnummer: number, kategorie: string, preis: number, shopID: number, produktLink: string, anbieter: string,
        Name: string, Hersteller: string) {

        super(artikelnummer, kategorie, preis, shopID, produktLink, anbieter)
        this.name = Name;
        this.hersteller = Hersteller;
    }

    public gibName(): string{
        return this.name;
    }

    override gibArtikelBeschreibung(): string {
        return `${this.hersteller}`;
    }

    override gibArtikelTitel(): string {
        return `${this.name}`;
    }

}