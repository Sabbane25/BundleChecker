import { Artikel } from "./artikel.model";

export class Gehaeuse extends Artikel{
    marke: string;
    modell: string;
    frontenschluesse: number;
    mainboardFormfaktor: string;
    material: string;
    abmessungen: string;
}