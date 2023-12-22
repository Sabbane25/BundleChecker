import { Component, Input, ViewChild,  ElementRef } from '@angular/core';
import { FilterService } from 'src/services/filter.service'; 
import { Filter } from 'src/models/filter.models';
import { Artikel } from 'src/models/artikel.model';
import { ArtikelService } from 'src/services/artikel.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['filter.component.css']
})
export class FilterComponent{

  constructor(private filterService: FilterService, private artikelService: ArtikelService ){}

  @Input() filterKategorie: string; // recuper la Kategorie d'article lors du clik sur un filtre
  @Input() artikelliste: Array<{ kategorie: string, artikelListe: Array<{ shop1: Artikel, shop2: Artikel}>}>; // liste de tout
  @ViewChild('checkbox') checkbox!: ElementRef;
  @ViewChild('preis') preis!: ElementRef;
  checkboxValue: {[key:string]: boolean} = {};
  vonInputValue: number; // input Preis von 
  bisInputValue: number; // input Preis bis
  alleEingenschaftenListe: { kategorie: string, eingenschaftListe: { marke: String }[] }[] = [];
  isFilterSichtbar: boolean = false; //true wenn der Filter sichtbar ist 
  listeEigenschaften: { kategorie: string, liste: { typ: string; listeType: string[] }[] }[] = [];
  selektierteCheckboxMap = new Map(); // die Map enthält alle 
  checkboxStatus: any[] = []; //tableau pour recuperer toute 
  hatArtikelGefunden: boolean = true;   // gib eine Meldung zurük, wenn es kein Artikel gefunden wird (Filter)
  loadingFilter: boolean = true; // bewirkt eine Ladeanimation, solange die Produkte noch nicht angezeigt werden.



  /**
   * Diese Methode wird aufgerufen, wenn der Benutzer eine Checkbox ändert, und aktualisiert den Status der Checkbox im Modell.
   * @param eigenschaftTyp Der Typ der Eigenschaft (Kategorie).
   * @param eigenschaftValue Der Wert der Eigenschaft (Unterkategorie).
   * @param event Das Change-Ereignisobjekt der Checkbox.
   */
  sedeListeItem(eigenschaftTyp: string, eigenschaftValue: string, event: any): void{
    // Aktuellen Status der Checkbox erfassen
    const checkboxChecked = (event.target as HTMLInputElement);
    // Checkbox-Status zur Liste hinzufügen
    this.checkboxStatus.push(checkboxChecked);

    // Konsolenausgabe für Debugging-Zwecke

    // Überprüfe, ob bereits eine Auswahl für die aktuelle Kategorie existiert
    if (this.selektierteCheckboxMap.has(eigenschaftTyp)) {
      // Falls ja, entferne die bestehende Auswahl
      this.selektierteCheckboxMap.delete(eigenschaftTyp);
    } else {
      // Falls nicht, setze die aktuelle Auswahl
      this.selektierteCheckboxMap.set(eigenschaftTyp, eigenschaftValue);
    }
  }

  /**
   * Diese Methode erstellt einen Filter basierend auf den ausgewählten Filteroptionen und sendet ihn an den FilterService.
   * Außerdem aktualisiert sie den Status für das Vorhandensein von Artikeln.
   */
  filterErgebniss() {
    let artikelFilter: Filter = {
      artikelKategorie : this.filterKategorie,
      preis : {von: this.vonInputValue, bis: this.bisInputValue},
      checkbox: this.selektierteCheckboxMap,
      brecheFilterAb: true,
      filterZustant: false,
    }
    //sendet das Filterobjekt an die Komponente list-komponente.ts, um den Filter auszuführen
    this.filterService.sendeListeKomponenten(artikelFilter);

    // lösche alle Checkbox nach dem klickt, um zu filtern
    artikelFilter.checkbox.clear();

    //hebt nach dem Klick alle Häkchen auf 
    for(let checkboxItem of this.checkboxStatus){
      checkboxItem.checked = false;
    }

    // schließt die Liste der Eigenschaften, nach dem Klick
    this.isFilterSichtbar = false;

    this.hatArtikelGefunden = this.artikelService.hatArtikel;
  }

  /**
 * Diese Methode setzt alle ausgewählten Filteroptionen zurück und sendet einen Filter mit den Standardwerten an den FilterService.
 * Außerdem werden alle Checkboxen im Modell zurückgesetzt und auf nicht ausgewählt gesetzt.
 */
  filterAbbrechen(){
    // Setze die Checkbox-Map im Modell zurück
    this.selektierteCheckboxMap.clear();  

     // Setze die Preiseingaben im Modell zurück
    this.vonInputValue = 0;
    this.bisInputValue = 0;

    // Setze den Status für das Vorhandensein von Artikeln zurück
    this.hatArtikelGefunden = true;
    
    // Erstelle einen Filter mit den Standardwerten und sende ihn an den FilterService
    let artikelFilter: Filter = {
      artikelKategorie : this.filterKategorie,
      preis : {von: 0, bis: 0},
      checkbox: this.selektierteCheckboxMap,
      brecheFilterAb: false,
      filterZustant: false,
    }
    this.filterService.sendeListeKomponenten(artikelFilter);

    // Setze alle Checkboxen im Modell zurück und setze sie auf nicht ausgewählt
    for(let checkboxItem of this.checkboxStatus){
      checkboxItem.checked = false;
    }
  }

  /**
   * Diese Methode ruft eine Liste von Eigenschaften basierend auf der Kategorie und Eigenschaft ab.
   * @param kategorie Die Kategorie, für die die Eigenschaften abgerufen werden sollen.
   * @param eigenschaft Die spezifische Eigenschaft, für die die Liste erstellt wird.
   * @returns Eine Liste von Eigenschaften als Array von Zeichenketten.
   */
  gibListeEigenschafte(kategorie: string, eigenschaft: string): string[] {
    let eingeschaftListe: string[] = [];
    this.artikelService.gibListeEigenschaft(kategorie, eigenschaft).subscribe((data) => {
      try{
        for(let param of data){
          let item = Object.keys(param);
          if(param[item[0]].length > 1 || param[item[0]] > 1){
            eingeschaftListe.push(param[item[0]]);
          }
        }
      }catch (error){
        console.error('Fehler während des Ladens der Eigentschaften');
      }
    });
    return eingeschaftListe;
  }

  /**
   * Diese Methode ruft eine Liste von Marken basierend auf der angegebenen Kategorie ab.
   * @param kategorie Die Kategorie, für die die Marken abgerufen werden sollen.
   * @returns Eine Liste von Marken als Array von Zeichenketten.
   */
  gibListeArikelMarke(kategorie: string): string[]{
    let listeMarke: string[] = [];
    this.artikelService.gibListeMarke(kategorie).subscribe((data) => {
      for(let param of data){
        let item = Object.keys(param);
        listeMarke.push(param[item[0]]);
      }
    });
    return listeMarke;
  }

  // zeigt der Filter
  zeigeFilter(){
    this.loadingFilter = true;
    this.isFilterSichtbar = !this.isFilterSichtbar;
    setTimeout(() =>{
      this.listeEigenschaften.length === 0;
      this.loadingFilter = false;
    }, 2000);
  }

  ngOnInit(): void {
    this.ladeFilterkriterien();
  }

  /**
   * Diese Methode erstellt eine sortierte Liste von Filterkriterien für verschiedene Artikelkategorien.
   * @returns Eine Liste von Filterkriterien für verschiedene Artikelkategorien.
   */
  sortiereFilterkriterien(){
    // Initialisiere die Liste für die Filterkriterien
    let listeEigenschaften: { kategorie: string, liste: { typ: string; listeType: string[] }[] }[] = [];


    // Filterkriterien für CPU
    let filterCPU = [
      { typ: 'anzahlKerne', listeType: this.gibListeEigenschafte('CPU','anzahlKerne') },
      { typ: 'marke', listeType: this.gibListeArikelMarke('CPU') },
      { typ: 'typ', listeType: this.gibListeEigenschafte('CPU','typ') },
      { typ: 'taktfrequenz', listeType: this.gibListeEigenschafte('CPU','taktfrequenz') },
    ];

    //Filterkriterien für Festplatte
    let filterFestplatte = [
      { typ: 'marke', listeType: this.gibListeArikelMarke('Festplatte') },
      { typ: 'typ', listeType: this.gibListeEigenschafte('Festplatte','typ') },
      { typ: 'kapazitaet', listeType: this.gibListeEigenschafte('Festplatte','kapazitaet') }
    ];

    //Filterkriterien für Mainboard
    let filterMainboard = [
      { typ: 'marke', listeType: this.gibListeArikelMarke('Mainboard') },
      { typ: 'chipsatz', listeType: this.gibListeEigenschafte('Mainboard','chipsatz') },
      { typ: 'maxRam', listeType: this.gibListeEigenschafte('Mainboard','maxRam') },
      { typ: 'sockel', listeType: this.gibListeEigenschafte('Mainboard','sockel') }
    ];

    //Filterkriterien für Gehäuse
    let filterGehäuse = [
      { typ: 'marke', listeType: this.gibListeArikelMarke('Gehäuse') },
      { typ: 'formfaktor', listeType: this.gibListeEigenschafte('Gehäuse','formfaktor') },
      { typ: 'typ', listeType: this.gibListeEigenschafte('Gehäuse','typ') }
    ];

    //Filterkriterien für Grafikkarte
    let filterGrafikkarte = [
      { typ: 'marke', listeType: this.gibListeArikelMarke('Grafikkarte') },
      { typ: 'kapazitaet', listeType: this.gibListeEigenschafte('Grafikkarte','kapazitaet') },
      { typ: 'streamprozessoren', listeType: this.gibListeEigenschafte('Grafikkarte','streamProzessoren') },
      { typ: 'model', listeType: this.gibListeEigenschafte('Grafikkarte','model') }
    ];

    //Filterkriterien für Netzteil
    let filterNetzteil = [
      { typ: 'marke', listeType: this.gibListeArikelMarke('Netzteil') },
      { typ: 'bauform', listeType: this.gibListeEigenschafte('Netzteil','bauform') },
      { typ: 'zertifizierung', listeType: this.gibListeEigenschafte('Netzteil','zertifizierung') },
      { typ: 'leistung', listeType: this.gibListeEigenschafte('Netzteil','leistung') }
    ];

    //Filterkriterien für RAM
    let filterRAM = [
      { typ: 'marke', listeType: this.gibListeArikelMarke('RAM') },
      { typ: 'kapazitaet', listeType: this.gibListeEigenschafte('RAM','kapazitaet') },
      { typ: 'typ', listeType: this.gibListeEigenschafte('RAM','typ') },
      { typ: 'latancy', listeType: this.gibListeEigenschafte('RAM','latency') },
      { typ: 'spannung', listeType: this.gibListeEigenschafte('RAM','spannung') }
    ];
    
    // Füge die Filterkriterien für jede Kategorie zur Gesamtliste hinzu
    listeEigenschaften.push( { kategorie: 'CPU', liste: filterCPU } );
    listeEigenschaften.push( { kategorie: 'Festplatte', liste: filterFestplatte} );
    listeEigenschaften.push( { kategorie: 'Mainboard', liste: filterMainboard } );
    listeEigenschaften.push( { kategorie: 'Gehäuse', liste: filterGehäuse } );
    listeEigenschaften.push( { kategorie: 'Grafikkarte', liste: filterGrafikkarte } );
    listeEigenschaften.push( { kategorie: 'Netzteil', liste: filterNetzteil } );
    listeEigenschaften.push( { kategorie: 'RAM', liste: filterRAM } );

    // Gib die sortierte Liste von Filterkriterien zurück
    return listeEigenschaften;
  }

  /**
   * Diese Methode lädt die sortierten Filterkriterien in die Komponente.
   */
  ladeFilterkriterien(){
    for(let item of this.sortiereFilterkriterien()){
      this.listeEigenschaften.push(item);
    }
  }

  /**
   * Diese Methode wird beim Initialisieren der Komponente aufgerufen und lädt die Filterkriterien.
   */
  submitForm(arg0: any) {
    console.log('');
  }

}