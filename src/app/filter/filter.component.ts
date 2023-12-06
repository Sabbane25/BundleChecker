import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListKomponenteComponent } from '../konfiguration/list-komponente/list-komponente.component';
import { FilterService } from 'src/services/filter.service'; 
import { Filter } from 'src/models/filter.models';
import { Artikel } from 'src/models/artikel.model';
import { ArtikelService } from 'src/services/artikel.service';

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

  vonInputValue: number;
  bisInputValue: number;
  checkboxMarke: boolean;
  checkboxListeMarke: {marke: String}[];
  test: [] = [];
  filterPreis: { von: number, bis: number };
  alleEingenschaftenListe: { kategorie: string, eingenschaftListe: { marke: String }[] }[] = [];
  itemFilter: { kategorie: string, eingenschaftListe: { marke: String }[] }[] = [];
  isFilterSichtbar: boolean = false; 
  listeEigenschaften: { kategorie: string, liste: { typ: string; listeType: string[] }[] }[] = [];
  

  filterErgebniss() {
    let artikelFilter: Filter = {
      artikelKategorie : this.filterKategorie,
      preis : {von: this.vonInputValue, bis: this.bisInputValue},
      marke : 'leer'
    }
    
    console.log('von: ', this.filterPreis);
    this.filterService.sendeListeKomponenten(artikelFilter);
  }

  // cette methode permet de recuper toutes une liste de Kritere de filtre pour un Artikle
  gibListeEigenschafte(kategorie: string, eigenschaft: string): string[] {
    let eingeschaftListe: string[] = [];
    this.artikelService.gibListeEigenschaft(kategorie, eigenschaft).subscribe((data) => {
      for(let param of data){
        let item = Object.keys(param);
        eingeschaftListe.push(param[item[0]]);
      }
    });
    //console.log('gLe:', eingeschaftListe);
    return eingeschaftListe;
  }

  //gib eine liste Von marke je nach Artikel
  gibListeArikelMarke(kategorie: string): {marke: String}[]{
    let listeMarke: {marke: String}[] = [];
    this.artikelService.gibListeMarke(kategorie).subscribe((data) => {
      for(let marke of data){
        listeMarke.push(marke);
      }
    });
    return listeMarke;
  }

  zeigeFilter(){
    console.log('Test Methode gibListeEigenschaften: ', this.gibListeEigenschafte('CPU', 'typ'));
    this.isFilterSichtbar = !this.isFilterSichtbar;
    this.checkboxListeMarke = this.gibListeArikelMarke(this.filterKategorie);
    this.alleEingenschaftenListe.push( { kategorie: 'Marke', eingenschaftListe: this.checkboxListeMarke } );
  }

  filterAbbrechen(){
    this.vonInputValue = 0;
    this.bisInputValue = 0;
  }

  ngOnInit(): void {
    console.log('tab: ', this.ladeFilter());
    for(let item of this.ladeFilter()){
      this.listeEigenschaften.push(item);
    }
  }

  gebeKategorie(kategorie: string){
    return kategorie;
  }

  // cette methode permet de charcher les differents filtres
  ladeFilter(){
    //let listeEigenschaften: { kategorie: String, liste: { typ: string; listeType: string[]} }[];
    let listeEigenschaften: { kategorie: string, liste: { typ: string; listeType: string[] }[] }[] = [];


    //CPU
    let filterCPU = [
      { typ: 'Typ', listeType: this.gibListeEigenschafte('CPU','typ') },
      { typ: 'Kerne', listeType: this.gibListeEigenschafte('CPU','anzahlkerne') },
      { typ: 'Taktfrequenz', listeType: this.gibListeEigenschafte('CPU','taktfrequenz') }
    ];

    //Festplatte
    let filterFestplatte = [
      { typ: 'Typ', listeType: this.gibListeEigenschafte('Festplatte','typ') },
      { typ: 'Kapazität', listeType: this.gibListeEigenschafte('Festplatte','kapazitaet') }
    ];

    //Mainboard
    let filterMainboard = [
      { typ: 'Chipsatz', listeType: this.gibListeEigenschafte('Mainboard','chipsatz') },
      { typ: 'MaxRam', listeType: this.gibListeEigenschafte('Mainboard','maxRam') },
      { typ: 'Sockel', listeType: this.gibListeEigenschafte('Mainboard','sockel') }
    ];

    //Gehäuse
    let filterGehäuse = [
      { typ: 'Formfaktor', listeType: this.gibListeEigenschafte('Gehäuse','formfaktor') },
      { typ: 'Typ', listeType: this.gibListeEigenschafte('Gehäuse','typ') }
    ];

    //Grafikkarte
    let filterGrafikkarte = [
      { typ: 'Kapazitaet', listeType: this.gibListeEigenschafte('Grafikkarte','kapazitaet') },
      { typ: 'Streamprozessoren', listeType: this.gibListeEigenschafte('Grafikkarte','streamProzessoren') },
      { typ: 'Model', listeType: this.gibListeEigenschafte('Grafikkarte','model') }
    ];

    //Netzteil
    let filterNetzteil = [
      { typ: 'Bauform', listeType: this.gibListeEigenschafte('Netzteil','bauform') },
      { typ: 'Zertifizierung', listeType: this.gibListeEigenschafte('Netzteil','zertifizierung') },
      { typ: 'Leistung', listeType: this.gibListeEigenschafte('Netzteil','leistung') }
    ];

    //RAM
    let filterRAM = [
      { typ: 'Kapazitaet', listeType: this.gibListeEigenschafte('RAM','kapazitaet') },
      { typ: 'Typ', listeType: this.gibListeEigenschafte('RAM','typ') },
      { typ: 'Latancy', listeType: this.gibListeEigenschafte('RAM','latency') },
      { typ: 'Spannung', listeType: this.gibListeEigenschafte('RAM','spannung') }
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
}
