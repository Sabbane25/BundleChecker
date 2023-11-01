import { Component } from '@angular/core';
import { Artikel } from 'src/models/artikel.model';


@Component({
  selector: 'app-merkzettel',
  templateUrl: './merkzettel.component.html',
  styleUrls: ['./merkzettel.component.css']
})
export class MerkzettelComponent {
  merkzettelArtikel: Artikel[] = []; // Hier werden die Artikel im Merkzettel gespeichert

  // Methode, um Artikel aus dem Merkzettel zu entfernen
  removeItemFromMerkzettel(artikel: Artikel) {
    const index = this.merkzettelArtikel.indexOf(artikel);
    if (index !== -1) {
      this.merkzettelArtikel.splice(index, 1);
    }
  }

}
