import { Artikel } from './artikel';
import { Komponent } from './komponent';

export const KOMPOENTEN: Komponent[] = [
    {
        id: 1,
        name: 'CPU',
        artikel: [
            new Artikel(1, "CPU", "Intel-1", 87, "www.link/zum/Produkt", "Beziechnung-1", 1),
            new Artikel(2, "CPU", "Intel-2", 87, "www.link/zum/Produkt", "Beziechnung-2", 2),
            new Artikel(3, "CPU", "Intel-3", 87, "www.link/zum/Produkt", "Beziechnung-3", 3)],
    },
    {
        id: 1,
        name: 'GPU',
        artikel: [
            new Artikel(1, "GPU", "Intel-1", 87, "www.link/zum/Produkt", "Beziechnung-1", 1),
            new Artikel(2, "GPU", "Intel-2", 87, "www.link/zum/Produkt", "Beziechnung-2", 2),
            new Artikel(3, "GPU", "Intel-3", 87, "www.link/zum/Produkt", "Beziechnung-3", 3)],
    },
    {
        id: 1,
        name: 'MAINBOARD',
        artikel: [
            new Artikel(1, "MAINBOARD", "Intel-1", 87, "www.link/zum/Produkt", "Beziechnung-1", 1),
            new Artikel(2, "MAINBOARD", "Intel-2", 87, "www.link/zum/Produkt", "Beziechnung-2", 2),
            new Artikel(3, "MAINBOARD", "Intel-3", 87, "www.link/zum/Produkt", "Beziechnung-3", 3)],
    },
    {
        id: 1,
        name: 'RAM',
        artikel: [
            new Artikel(1, "RAM", "Intel-1", 87, "www.link/zum/Produkt", "Beziechnung-1", 1),
            new Artikel(2, "RAM", "Intel-2", 87, "www.link/zum/Produkt", "Beziechnung-2", 2),
            new Artikel(3, "RAM", "Intel-3", 87, "www.link/zum/Produkt", "Beziechnung-3", 3)],
    }
]