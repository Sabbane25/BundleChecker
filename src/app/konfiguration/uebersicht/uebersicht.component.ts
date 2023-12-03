import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ARTIKEL_LIST } from 'src/models/artikel_mockup';
import { Artikel } from 'src/models/artikel.model';
import { MerkzettelComponent } from 'src/app/merkzettel/merkzettel/merkzettel.component';
import { MerkzettelService } from 'src/services/merkzettel.service';
import {TokenStorageService} from "../../../services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-uebersicht',
  templateUrl: './uebersicht.component.html',
  styleUrls: ['./uebersicht.component.css']
})
export class UebersichtComponent implements OnInit {

  ausgewaehlteProdukte: any[] = [];
  bundles: { anbieter: string; artikelList: Artikel[] }[] = []; // Hier wird bundles deklariert
  merkzettel: { anbieter: string; artikelList: Artikel[] }[] = []; //Array, um die Bundles im Merkzettel aufzurufen/speichern.
  isLoggedIn: boolean = false
  merkzettelHinzugefuegt: boolean = false;

  constructor(private http: HttpClient, private merkzettelService: MerkzettelService, private tokenStorageService: TokenStorageService, private router: Router, ) {}

  ngOnInit() {
    this.gibGuenstigstesBundle(this.ausgewaehlteArtikel);
    this.groupByAnbieter();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }


  //Die Variable enthält alle Artikel die in Listkomponenten ausgewälte wurde
  ausgewaehlteArtikel:  Artikel[] = ARTIKEL_LIST;

  /**
   * @param listArtikel Liste von allen verfügbaren Artikeln
   * @returns Eine Liste mit jeweils dem günstigsten Produkt aus jeder Kategorie.
   */
  gibGuenstigstesBundle(listArtikel: Artikel[]): Artikel[] {
    const guenstigsteProdukte: Artikel[] = [];

    // Erstelle eine Map, um die günstigsten Produkte pro Kategorie zu verfolgen
    const guenstigsteProKategorie = new Map<string, Artikel>();

    // Iteriere durch alle verfügbaren Artikel
    for (const artikel of listArtikel) {
      const kategorie = artikel.kategorie;

      // Prüfe, ob es bereits ein günstigstes Produkt in dieser Kategorie gibt
      if (!guenstigsteProKategorie.has(kategorie)) {
        guenstigsteProKategorie.set(kategorie, artikel);
      } else {
        // Vergleiche den Preis mit dem bisher günstigsten Produkt in dieser Kategorie
        const bisherGuenstigstes = guenstigsteProKategorie.get(kategorie);
        if (bisherGuenstigstes && artikel.preis < bisherGuenstigstes.preis) {
          guenstigsteProKategorie.set(kategorie, artikel);
        }
      }
    }

    // Füge die günstigsten Produkte zur Ergebnisliste hinzu
    guenstigsteProKategorie.forEach((artikel) => {
      guenstigsteProdukte.push(artikel);
    });

    return guenstigsteProdukte;


  }

  /**
   * Die Methode prüft, ob ein Artikel aus einer Kategorie bereits im Bundle ist, falls ja, wird einen Artikel pro Kategorie genommen.
   */
  groupByAnbieter() {
    // Gruppieren der Artikel nach Anbieter
    const groupedByAnbieter: { [key: string]: Artikel[] } = {};

    // Verfolgen der bereits verwendeten Kategorien
    const usedKategorien: Set<string> = new Set();

    this.ausgewaehlteArtikel.forEach((artikel) => {
      const anbieter = artikel.bildUrl;
      const kategorie = artikel.kategorie;

      // Prüfe, ob die Kategorie bereits in den Bundles verwendet wurde
      if (!usedKategorien.has(kategorie)) {
        if (!groupedByAnbieter[anbieter]) {
          groupedByAnbieter[anbieter] = [];
        }
        groupedByAnbieter[anbieter].push(artikel);

        // Markiere die Kategorie als verwendet
        usedKategorien.add(kategorie);
      }
    });

    // Umwandeln in ein Array für die Verwendung in der Vorlage
    this.bundles = Object.keys(groupedByAnbieter).map((anbieter) => ({
      anbieter,
      artikelList: groupedByAnbieter[anbieter],
    }));
  }

  // Methode zum Löschen eines Bundles oder Artikel.
  delete(bundle: { anbieter: string; artikelList: Artikel[] }) {
    // Hier implementierst du die Logik zum Löschen des ausgewählten Bundles.
    // Das Bundle wird aus dem 'bundles'-Array entfernt.
    const index = this.bundles.indexOf(bundle);
    if (index !== -1) {
      this.bundles.splice(index, 1);
    }
  }

  //Methode, um Bundle im Merkzettel hinzuzufügen.
  addToMerkzettel(bundle: { anbieter: string; artikelList: Artikel[] }) {
    // Nehme den gesamten Bundle und füge ihn dem Merkzettel hinzu
    this.merkzettel.push(bundle);
  }

  deleteBundle(bundle: { anbieter: string; artikelList: Artikel[] }) {
    // Hier implementierst du die Logik zum Löschen des gesamten Bundles.
    // Du kannst die Bundles-Liste durchsuchen und das gewünschte Bundle entfernen.
    const index = this.bundles.findIndex(b => b === bundle);
    if (index !== -1) {
      this.bundles.splice(index, 1);
    }
  }

  /**
   * Sammle die Artikel urls und sende sie an den Service
   * um einen Merkzettel zu erstellen
   *
   * @param bundles
   */
  erstelleMerkzettel(bundles: any) {
    const artikelUrls: string[] = [];

    for (let bundle of bundles) {
        for (let artikel of bundle.artikelList) {
            artikelUrls.push(artikel.produktLink);
        }
    }

    this.merkzettelService.erstelleMerkzettel(artikelUrls)
    this.merkzettelHinzugefuegt = true;
  }
}
