import { Component, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ArtikelService } from 'src/services/artikel.service';

@Component({
  selector: 'app-konfiguration',
  templateUrl: './konfiguration.component.html',
  styleUrls: ['konfiguration.component.css']
})
export class KonfigurationComponent {

  //Initialisierung von Variablen, die dem Switch zwischen den verschiedenen Komponenten dienen: Listenkomponente und Uebersicht.
  zeigeListUebersicht = false;
  // BehaviorSubject uas der ArtikelService. Für die Kommunikation zwischen Übersciht, Konfiguration und List-Komponente
  zeigeListKomponenten$: Observable<boolean | null> = this.artikelService.wechseltKomponenteObservable$;
  gibFarbe: boolean = false;

  constructor(private artikelService: ArtikelService){}

  //diese Methode wechselt von der liste-komponentenliste zur uebersicht
  zuUebersicht(){
    this.artikelService.wechseltKomponenteFunktion(false);
    this.zeigeListUebersicht = true;
    this.gibFarbe = this.zeigeListUebersicht;
  }

  //diese Methode wechselt von der uebersicht zur liste-komponentenliste 
  zuKomponenten(){
    this.zeigeListUebersicht = false;
    this.artikelService.wechseltKomponenteFunktion(true);
    this.gibFarbe = this.zeigeListUebersicht;
  }

  ngOnInit(): void {
    this.zeigeListKomponenten$.subscribe((valeur) => {
      if (valeur === false) {
        this.gibFarbe = !this.zeigeListUebersicht;
      }else{
        this.gibFarbe = this.zeigeListUebersicht;
      }
    });
  }
}
