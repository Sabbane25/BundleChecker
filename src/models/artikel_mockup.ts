import { Artikel } from "./artikel.model";
import { Cpu } from "./cpu.model";
import { Gehaeuse } from "./gehaeuse.model";
import { Speicher } from "./speicher.model";
import { Ram } from "./ram.model";

export const ARTIKEL_LIST: Artikel[] = [
    new Cpu("CPU", 199.99, 2, "https://www.future-x.de/Intel-Core-i5-10600KF-10.-Gen.-4.1-GHz-6-Kerne-12-Threads-12-MB-Cache-Speicher-LGA1200-Socket-OEM/998915872", "Notebooksbilliger", 20231205,"Intel", "",1, "LGA 1200", 8, 95, "3.6 GHz", "UHD Graphics 630", 12, "", 1),
    new Cpu("CPU", 149.99, 2, "https://www.future-x.de/Intel-Xeon-E-2336-2.9-GHz-6-Kerne-12-Threads-12-MB-Cache-Speicher-LGA1200-Socket-OEM/999367236", "Notebooksbilliger", 20231205,"AMD", "",2, "AM4", 6, 65, "3.4 GHz", "Radeon Vega", 10, "", 1),
    new Cpu("CPU", 229.99, 2, "https://www.future-x.de/Intel-Xeon-E-2236-3.4-GHz-6-Kerne-12-Threads-12-MB-Cache-Speicher-LGA1151-Socket-OEM/996614982", "Alternate", 20231205,"Intel", "",3, "LGA 1200", 8, 95, "3.6 GHz", "UHD Graphics 630", 10, "", 1),
    new Cpu("CPU", 149.99, 2, "https://www.future-x.de/Intel-Core-i5-12500-12.-Gen.-3-GHz-6-Kerne-12-Threads-18-MB-Cache-Speicher-LGA1700-Socket-OEM/999429201", "Alternate", 20231205,"AMD", "",4, "AM4", 6, 65, "3.4 GHz", "Radeon Vega", 10, "", 1),

    new Gehaeuse("Gehaeuse", 79.99, 3, "https://www.alternate.de/configurator.xhtml?pca=20&pco=49&pkid=1596912&pcs=relevance", "Alternate", 20231205,"Corsair", "",4, "ATX Mid Tower", "2x Audio, 1x USB-A 3.2 Gen 1 (5 Gbit/s), 1x USB-C 3.2 Gen 2 (10 Gbit/s)", "200 x 450 x 400 mm", "Tower-Gehäuse", 8),
    new Gehaeuse("Gehaeuse", 69.99, 3, "https://www.alternate.de/configurator.xhtml?pca=20&pco=49&pkid=1301672&pcs=relevance", "Alternate", 20231205,"NZXT", "",5, "Mini-ITX", "2x Audio, 2x USB-A 3.2 Gen 1 (5 Gbit/s)", "180 x 360 x 300 mm", "Tower-Gehäuse", 7),
    new Gehaeuse("Gehaeuse", 89.99, 3, "https://www.alternate.de/configurator.xhtml?pca=20&pco=49&pkid=1550455&pcs=relevance", "Notebooksbilliger", 20231205,"Corsair", "",6, "ATX Mid Tower", "2x Audio, 2x USB-A 3.2 Gen 1 (5 Gbit/s)", "200 x 450 x 400 mm", "Tower-Gehäuse", 7),
    new Gehaeuse("Gehaeuse", 49.99, 3, "https://www.alternate.de/configurator.xhtml?pca=20&pco=49&pkid=1550459&pcs=relevance", "Notebooksbilliger", 20231205,"Cooler Master","", 7, "Micro-ATX", "2x Audio, 2x USB-A 3.2 Gen 1 (5 Gbit/s)", "160 x 380 x 350 mm",  "Tower-Gehäuse", 8),

    new Ram("RAM", 79.99, 4, "https://www.alternate.de/configurator.xhtml?pca=20&pco=46&pkid=1230516&pcs=relevance", "Notebooksbilliger", 20231205,"Corsair", "",4, "SDRAM-DDR4", 32, 16, 1.35),
    new Ram("RAM", 99.99, 4, "https://www.alternate.de/configurator.xhtml?pca=20&pco=46&pkid=1713292&pcs=relevance", "Notebooksbilliger", 20231205,"G.Skill", "",3, "SDRAM-DDR4", 32, 18, 1.35),
    new Ram("RAM", 59.99, 4, "https://www.alternate.de/configurator.xhtml?pca=20&pco=46&pkid=1584014&pcs=relevance", "Alternate", 20231205,"Corsair", "",2, "SDRAM-DDR4", 16, 16, 1.35),
    new Ram( "RAM", 149.99, 4, "https://www.alternate.de/configurator.xhtml?pca=20&pco=46&pkid=1584069&pcs=relevance", "Alternate",20231205,"G.Skill", "",1, "SDRAM-DDR4", 32, 16, 1.35),

    new Speicher("Speicher", 99.99, 5, "https://www.future-x.de/Samsung-980-PRO-SSD-2-TB-NVMe-M.2-intern/999194014", "Alternate", 20231205,"Samsung", "",1, "Solid State Drive", "2 TB", 7000, 5100),
    new Speicher("Speicher", 79.99, 5, "https://www.future-x.de/Seagate-NAS-HDD-3.5-IronWolf-Pro-4-TB-7.2K-SATA-Festplatte-Serial-ATA-4.000-GB-7.200-rpm/996615111", "Alternate", 20231205,"Crucial", "",2, "Festplatte", "480 GB", 210, 210),
    new Speicher("Speicher", 149.99, 5, "https://www.future-x.de/Kingston-Data-Center-DC500R-SSD-960-GB-SATA3-2.5-256-Bit-AES-Verschluesselung-intern/995676228", "Notebooksbilliger", 20231205,"Samsung", "970 EVO", 3,"Solid State Drive", "1 TB", 555, 525),
    new Speicher("Speicher", 69.99, 5, "https://www.future-x.de/Seagate-FIRECUDA-530-NVME-SSD500-GB-M.2S-PCIE-GEN4-3D-TLC-Heatsink-Solid-State-Disk-NVMe/999327295", "Notebooksbilliger", 20231205,"Crucial", "", 4, "Solid State Drive", "480 GB", 7000, 3000)
]
