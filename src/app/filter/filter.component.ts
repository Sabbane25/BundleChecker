import { Component, Input, Output, EventEmitter, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  listeKategorie: string[] = ['CPU', 'Festplatte', 'Gehaeuse', 'Grafikkarte','Mainboard', 'Netzteil', 'RAM'];
  @Input() filterKategorie: string;
  @Input() artikelliste: Array<{ kategorie: string, artikelListe: Array<{ shop1: Artikel, shop2: Artikel}>}>;
  @ViewChild('checkbox') checkbox!: ElementRef;
  
  checkboxValue: {[key:string]: boolean} = {};
  vonInputValue: number;
  bisInputValue: number;
  checkboxMarke: boolean;
  filterPreis: { von: number, bis: number };
  alleEingenschaftenListe: { kategorie: string, eingenschaftListe: { marke: String }[] }[] = [];
  itemFilter: { kategorie: string, eingenschaftListe: { marke: String }[] }[] = [];
  isFilterSichtbar: boolean = false; //true wenn der Filter sichtbar ist 
  listeEigenschaften: { kategorie: string, liste: { typ: string; listeType: string[] }[] }[] = [];
  selektierteCheckboxMap = new Map();
  checkboxStatus: any[] = [];
  checkboxElement: any;
  hatArtikelGefunden: boolean = true;   // gib ine Meldung zurük, wenn es kein Artikel gefunden wird


  // permet de recuper les donnees qui viennent du checkbox du html
  sedeListeItem(eigenschaftTyp: string, eigenschaftValue: string, event: any): void{
    this.checkboxStatus.push(event.currentTarget);
    this.selektierteCheckboxMap.set(eigenschaftTyp, eigenschaftValue);
  }

  /**
   *  la methode s'execute lors du click sur le bouton Bestätigen. Elle permet de recuper 
   *  les attributs qu'on souhaite filtrer et l'envoi vers le composant Konfiguration 
   */
  filterErgebniss() {
    let artikelFilter: Filter = {
      artikelKategorie : this.filterKategorie,
      preis : {von: this.vonInputValue, bis: this.bisInputValue},
      checkbox: this.selektierteCheckboxMap,
      brecheFilterAb: true,
    }
    this.filterService.sendeListeKomponenten(artikelFilter);
    this.hatArtikelGefunden = this.artikelService.hatArtikel;
    console.log('hatArtikel: ', this.hatArtikelGefunden);
  }

  // 
  filterAbbrechen(){
    this.selektierteCheckboxMap.clear();
    this.hatArtikelGefunden = true;
    let artikelFilter: Filter = {
      artikelKategorie : this.filterKategorie,
      preis : {von: this.vonInputValue, bis: this.bisInputValue},
      checkbox: this.selektierteCheckboxMap,
      brecheFilterAb: false,
    }
    this.filterService.sendeListeKomponenten(artikelFilter);

    for(let event of this.checkboxStatus){
      console.log(event, 'value vor');
      event.checked = false;
      console.log(event.cheched, 'value nach');
    }
  }

  // cette methode permet de recuper toutes une liste de Kritere de cle pour une categorie d'article
  gibListeEigenschafte(kategorie: string, eigenschaft: string): string[] {
    let eingeschaftListe: string[] = [];
    this.artikelService.gibListeEigenschaft(kategorie, eigenschaft).subscribe((data) => {
      for(let param of data){
        let item = Object.keys(param);
        eingeschaftListe.push(param[item[0]]);
      }
    });
    return eingeschaftListe;
  }

  // Retourne la Liste de toutes les marques d'une categories
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

  // permet d'afficher le filtre lorsque on clique sur filtre dans la page
  zeigeFilter(){
    this.isFilterSichtbar = !this.isFilterSichtbar;
  }

  ngOnInit(): void {
    this.ladeFilterkriterien();
  }

  ngAfterViewInit() {
    // Maintenant, 'checkboxes' contient une liste de toutes les occurrences d'éléments de checkbox
    // Vous pouvez y accéder avec this.checkboxes.toArray()
  }

  // Cette methode permet de recuper les differents criterer de filtre pour chaque kategorie d'article
  sortiereFilterkriterien(){
    let listeEigenschaften: { kategorie: string, liste: { typ: string; listeType: string[] }[] }[] = [];


    //CPU
    let filterCPU = [
      { typ: 'marke', listeType: this.gibListeArikelMarke('CPU') },
      { typ: 'typ', listeType: this.gibListeEigenschafte('CPU','typ') },
      { typ: 'anzahlKerne', listeType: this.gibListeEigenschafte('CPU','anzahlkerne') },
      { typ: 'taktfrequenz', listeType: this.gibListeEigenschafte('CPU','taktfrequenz') },
    ];

    //Festplatte
    let filterFestplatte = [
      { typ: 'marke', listeType: this.gibListeArikelMarke('Festplatte') },
      { typ: 'typ', listeType: this.gibListeEigenschafte('Festplatte','typ') },
      { typ: 'kapazitaet', listeType: this.gibListeEigenschafte('Festplatte','kapazitaet') }
    ];

    //Mainboard
    let filterMainboard = [
      { typ: 'marke', listeType: this.gibListeArikelMarke('Mainboard') },
      { typ: 'chipsatz', listeType: this.gibListeEigenschafte('Mainboard','chipsatz') },
      { typ: 'maxRam', listeType: this.gibListeEigenschafte('Mainboard','maxRam') },
      { typ: 'sockel', listeType: this.gibListeEigenschafte('Mainboard','sockel') }
    ];

    //Gehäuse
    let filterGehäuse = [
      { typ: 'marke', listeType: this.gibListeArikelMarke('Gehäuse') },
      { typ: 'formfaktor', listeType: this.gibListeEigenschafte('Gehäuse','formfaktor') },
      { typ: 'typ', listeType: this.gibListeEigenschafte('Gehäuse','typ') }
    ];

    //Grafikkarte
    let filterGrafikkarte = [
      { typ: 'marke', listeType: this.gibListeArikelMarke('Grafikkarte') },
      { typ: 'kapazitaet', listeType: this.gibListeEigenschafte('Grafikkarte','kapazitaet') },
      { typ: 'streamprozessoren', listeType: this.gibListeEigenschafte('Grafikkarte','streamProzessoren') },
      { typ: 'model', listeType: this.gibListeEigenschafte('Grafikkarte','model') }
    ];

    //Netzteil
    let filterNetzteil = [
      { typ: 'marke', listeType: this.gibListeArikelMarke('Netzteil') },
      { typ: 'bauform', listeType: this.gibListeEigenschafte('Netzteil','bauform') },
      { typ: 'zertifizierung', listeType: this.gibListeEigenschafte('Netzteil','zertifizierung') },
      { typ: 'leistung', listeType: this.gibListeEigenschafte('Netzteil','leistung') }
    ];

    //RAM
    let filterRAM = [
      { typ: 'marke', listeType: this.gibListeArikelMarke('RAM') },
      { typ: 'kapazitaet', listeType: this.gibListeEigenschafte('RAM','kapazitaet') },
      { typ: 'typ', listeType: this.gibListeEigenschafte('RAM','typ') },
      { typ: 'latancy', listeType: this.gibListeEigenschafte('RAM','latency') },
      { typ: 'spannung', listeType: this.gibListeEigenschafte('RAM','spannung') }
    ];
    
    listeEigenschaften.push( { kategorie: 'CPU', liste: filterCPU} );
    listeEigenschaften.push( { kategorie: 'Festplatte', liste: filterFestplatte} );
    listeEigenschaften.push( { kategorie: 'Mainboard', liste: filterMainboard } );
    listeEigenschaften.push( { kategorie: 'Gehäuse', liste: filterGehäuse } );
    listeEigenschaften.push( { kategorie: 'Grafikkarte', liste: filterGrafikkarte } );
    listeEigenschaften.push( { kategorie: 'Netzteil', liste: filterNetzteil } );
    listeEigenschaften.push( { kategorie: 'RAM', liste: filterRAM } );

    return listeEigenschaften;
  }

  // permet de charger les differents filtres pour chaque categorie
  ladeFilterkriterien(){
    for(let item of this.sortiereFilterkriterien()){
      this.listeEigenschaften.push(item);
    }
  }

  //submitForm(formData: any): void {
  submitForm(formData: NgForm): void {
    // Traitez les données du formulaire ici
    //console.log('ouput <input>-tag', formData);
    //console.log('Valeur du champ username :');
  }
}