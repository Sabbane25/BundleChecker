import { Artikel } from "./artikel.model";
import { BetriebsSystem } from "./betriebssystem.model";
import { Cpu } from "./cpu.model";
import { Gehaeuse } from "./gehaeuse.model";
import { Ram } from "./ram.model";
import { Speicher } from "./speicher.model";


// Objekte für jede Artikelkategorie
const betriebsSystem1 = new BetriebsSystem(1, "Logiciel", 49.99, 1, "lien1", "Windows 10", "Microsoft");
const betriebsSystem2 = new BetriebsSystem(2, "Logiciel", 79.99, 1, "lien2", "Ubuntu", "Canonical");
const betriebsSystem3 = new BetriebsSystem(3, "Logiciel", 149.99, 1, "lien3", "macOS", "Apple");
const betriebsSystem4 = new BetriebsSystem(4, "Logiciel", 29.99, 1, "lien4", "Fedora", "Red Hat");

const cpu1 = new Cpu(5, "Processeur", 199.99, 2, "lien5", "Intel", "Core i7", "95W", "3.6 GHz", "LGA 1200", "8", "UHD Graphics 630");
const cpu2 = new Cpu(6, "Processeur", 149.99, 2, "lien6", "AMD", "Ryzen 5", "65W", "3.4 GHz", "AM4", "6", "Radeon Vega");
const cpu3 = new Cpu(7, "Processeur", 299.99, 2, "lien7", "Intel", "Core i9", "125W", "3.8 GHz", "LGA 1151", "10", "UHD Graphics 630");
const cpu4 = new Cpu(8, "Processeur", 99.99, 2, "lien8", "AMD", "Athlon", "35W", "3.2 GHz", "AM4", "2", "Radeon Vega");

const gehaeuse1 = new Gehaeuse(9, "Boîtier", 79.99, 3, "lien9", "Corsair", "ATX Mid Tower", 2, "ATX", "Acier", "200 x 450 x 400 mm");
const gehaeuse2 = new Gehaeuse(10, "Boîtier", 69.99, 3, "lien10", "NZXT", "Mini-ITX", 1, "Mini-ITX", "Plastique", "180 x 360 x 300 mm");
const gehaeuse3 = new Gehaeuse(11, "Boîtier", 89.99, 3, "lien11", "Fractal Design", "ATX Full Tower", 4, "E-ATX", "Acier", "250 x 550 x 500 mm");
const gehaeuse4 = new Gehaeuse(12, "Boîtier", 49.99, 3, "lien12", "Cooler Master", "Micro-ATX", 3, "Micro-ATX", "Acier", "160 x 380 x 350 mm");

const ram1 = new Ram(13, "Mémoire RAM", 79.99, 4, "lien13", "Corsair", "Vengeance LPX", "DDR4", "16 GB", "16-18-18-36");
const ram2 = new Ram(14, "Mémoire RAM", 99.99, 4, "lien14", "G.Skill", "Trident Z", "DDR4", "32 GB", "15-16-16-35");
const ram3 = new Ram(15, "Mémoire RAM", 59.99, 4, "lien15", "Crucial", "Ballistix", "DDR4", "8 GB", "16-18-18-36");
const ram4 = new Ram(16, "Mémoire RAM", 149.99, 4, "lien16", "Kingston", "HyperX Fury", "DDR4", "64 GB", "17-19-19-39");

const speicher1 = new Speicher(17, "Stockage", 99.99, 5, "lien17", "Samsung", "970 EVO", "NVMe M.2", "1 TB", "3500 MB/s", "3300 MB/s");
const speicher2 = new Speicher(18, "Stockage", 79.99, 5, "lien18", "Crucial", "BX500", "SATA", "480 GB", "540 MB/s", "500 MB/s");
const speicher3 = new Speicher(19, "Stockage", 149.99, 5, "lien19", "WD", "Black SN750", "NVMe M.2", "2 TB", "3470 MB/s", "3000 MB/s");
const speicher4 = new Speicher(20, "Stockage", 69.99, 5, "lien20", "Seagate", "BarraCuda", "HDD", "4 TB", "256 MB Cache", "5400 RPM");

// Arrays um alle Artikel zu speichern
const mockup: Artikel[] = [betriebsSystem1, betriebsSystem2, betriebsSystem3, betriebsSystem4, cpu1, cpu2, cpu3, cpu4, gehaeuse1, gehaeuse2, gehaeuse3, gehaeuse4, ram1, ram2, ram3, ram4, speicher1, speicher2, speicher3, speicher4];


