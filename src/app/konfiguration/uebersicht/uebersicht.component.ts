import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    this.http.get('/api/bundles').subscribe((data: any[]) => {
      this.ausgewaehlteProdukte = data;
    });
  }
}
