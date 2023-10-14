import { Artikel } from "./artikel.model";

export class Gehaeuse extends Artikel{
    marke: string;
    modell: string;
    frontenschluesse: number;
    mainboardFormfaktor: string;
    material: string;
    abmessungen: string;

    constructor(
        Artikelnummer: number,
        Kategorie: string,
        Preis: number,
        ShopID: number,
        ProduktLink: string,
        marke: string,
        modell: string,
        frontenschluesse: number,
        mainboardFormfaktor: string,
        material: string,
        abmessungen: string
    ) {
        super(Artikelnummer, Kategorie, Preis, ShopID, ProduktLink);
        this.marke = marke;
        this.modell = modell;
        this.frontenschluesse = frontenschluesse;
        this.mainboardFormfaktor = mainboardFormfaktor;
        this.material = material;
        this.abmessungen = abmessungen;
    }
}