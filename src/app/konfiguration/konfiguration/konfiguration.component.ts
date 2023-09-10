import { Component } from '@angular/core';

@Component({
  selector: 'app-konfiguration',
  templateUrl: './konfiguration.component.html',
  styleUrls: ['konfiguration.component.css']
})
export class KonfigurationComponent {

  //Initialisation de variable, qui servent au swich entre les Komponanten et la liste Übersicht
  zeigeListUebersicht = false;
  zeigeListKomponenten = true;
  gitFarbe: boolean = false;

  //cette methode permet de passer de la liste de composant a la liste Übersicht
  zuUebersicht(){
    this.zeigeListKomponenten = false;
    this.zeigeListUebersicht = true;
    this.gitFarbe = this.zeigeListUebersicht;
  }

  //cette methode permet de passer de la liste de Übersicht a la liste de composant
  zuKomponenten(){
    this.zeigeListUebersicht = false;
    this.zeigeListKomponenten = true;
    this.gitFarbe = this.zeigeListUebersicht;
  }
}
