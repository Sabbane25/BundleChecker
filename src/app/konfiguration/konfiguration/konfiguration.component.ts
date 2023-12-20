import { Component } from '@angular/core';

@Component({
  selector: 'app-konfiguration',
  templateUrl: './konfiguration.component.html',
  styleUrls: ['konfiguration.component.css']
})
export class KonfigurationComponent {

  //Initialisierung von Variablen, die dem Switch zwischen den verschiedenen Komponenten dienen: Listenkomponente und Uebersicht.
  zeigeListUebersicht = false;
  zeigeListKomponenten = true;
  gibFarbe: boolean = false;

  //diese Methode wechselt von der liste-komponentenliste zur uebersicht
  zuUebersicht(){
    this.zeigeListKomponenten = false;
    this.zeigeListUebersicht = true;
    this.gibFarbe = this.zeigeListUebersicht;
  }

  //diese Methode wechselt von der uebersicht zur liste-komponentenliste 
  zuKomponenten(){
    this.zeigeListUebersicht = false;
    this.zeigeListKomponenten = true;
    this.gibFarbe = this.zeigeListUebersicht;
  }
}
