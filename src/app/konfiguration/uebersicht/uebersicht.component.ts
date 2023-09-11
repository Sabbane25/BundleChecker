import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Produkt {
  name: string;
  preis: number;
}


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
    this.http.get<Produkt[]>('http://192.168.198.48:3000').subscribe(
      (data) => {
        // Hier kannst du sicher sein, dass "data" ein Array von "Produkt"-Objekten ist.
        this.ausgewaehlteProdukte = data;
      },
      (error) => {
        console.error('Fehler beim Abrufen der Daten:', error);
        // Hier könntest du geeignete Maßnahmen ergreifen, z.B. eine Fehlermeldung an den Benutzer anzeigen.
      }
    );
  }
  
  
}
