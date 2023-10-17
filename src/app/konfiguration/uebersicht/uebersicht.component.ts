import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ARTIKEL_LIST } from 'src/models/artikel_mockup';
import { Artikel } from 'src/models/artikel.model';
import { Cpu } from 'src/models/cpu.model';

@Component({
  selector: 'app-uebersicht',
  templateUrl: './uebersicht.component.html',
  styleUrls: ['./uebersicht.component.css']
})
export class UebersichtComponent implements OnInit {

  ausgewaehlteProdukte: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Sende eine HTTP-Anfrage an deinen API-Endpunkt, um die Daten abzurufen.
  /*
    this.http.get('/api/bundles').subscribe((data: any[]) => {
      this.ausgewaehlteProdukte = data;
    });
    */
   this.gibguenstigstesBundle();
  }

  //Die Variable enthält alle Artikel die in Listkomponenten ausgewälte wurde
  ausgewaehlteArtikel:  Artikel[] = ARTIKEL_LIST; 

  /**
   * 
   * @param listArtikel Liste von allen ausgewälten Artikel in ListKomponenten
   * @returns eine sortierte Liste von Artikeln mit niedrigster Preis. Die liste bildet BUNDLE 1
   */
  gibguenstigstesBundle(): Artikel[]{
    const artikelListBundle1: Artikel[] = [];

    for(let i = 0; i < this.ausgewaehlteArtikel.length; i++){

      if(this.ausgewaehlteArtikel[i].anbieter === "Alternate"){
        artikelListBundle1.push(this.ausgewaehlteArtikel[i]);
      }
    }

    return artikelListBundle1;
  }

}
