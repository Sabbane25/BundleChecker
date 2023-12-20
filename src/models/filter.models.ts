/**
 * Das Filter-Interface definiert die Struktur für Filterkriterien.
 * @interface Filter
 * @property {string} artikelKategorie - Die ausgewählte Artikelkategorie, nach der gefiltert werden soll.
 * @property {Object} preis - Das Preisintervall, bestehend aus den Eigenschaften 'von' und 'bis'.
 * @property {Map<string, string>} checkbox - Eine Map, die Checkbox-Filter repräsentiert, wobei der Schlüssel den Filtertyp und der Wert den Filterwert darstellt.
 * @property {boolean} brecheFilterAb - Ein Flag, das angibt, ob der Filtervorgang abgebrochen werden soll.
 * @property {boolean} filterZustand - Ein Zustandsflag, das angibt, ob Filter aktiviert oder deaktiviert sind.
 */
export interface Filter {
  artikelKategorie: string;
  preis: { von: number, bis: number };
  checkbox: Map<string, string>;
  brecheFilterAb: boolean;
  filterZustant:boolean; 
}