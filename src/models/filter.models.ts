export interface Filter {
    artikelKategorie: string;
    preis: { von: number, bis: number };
    checkbox: Map<string, string>;
    //boolean = true,
  }