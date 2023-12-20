export interface Filter {
    artikelKategorie: string;
    preis: { von: number, bis: number };
    checkbox: Map<string, string>;
    brecheFilterAb: boolean;
    filterZustant:boolean; // si le filtre a deja ete utilise ou pas
  }