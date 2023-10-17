import { Artikel } from "./artikel.model";

export class Gehaeuse extends Artikel{
    marke: string;
    modell: string;
    frontenschluesse: number;
    mainboardFormfaktor: string;
    material: string;
    abmessungen: string;

    constructor(artikelnummer: number, kategorie: string, preis: number, shopID: number, produktLink: string, anbieter: string,
        marke: string, modell: string, frontenschluesse: number, mainboardFormfaktor: string, material: string, abmessungen: string) {
        super(artikelnummer, kategorie, preis,  shopID, produktLink, anbieter)
        this.marke = marke;
        this.modell = modell;
        this.frontenschluesse = frontenschluesse;
        this.mainboardFormfaktor = mainboardFormfaktor;
        this.material = material;
        this.abmessungen = abmessungen;
    }
}