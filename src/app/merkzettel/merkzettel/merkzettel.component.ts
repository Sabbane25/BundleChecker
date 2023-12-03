import { Component } from '@angular/core';
import { Artikel } from 'src/models/artikel.model';
import {HttpClient} from "@angular/common/http";
import {MerkzettelService} from "../../../services/merkzettel.service";
import {TokenStorageService} from "../../../services/token-storage.service";


@Component({
  selector: 'app-merkzettel',
  templateUrl: './merkzettel.component.html',
  styleUrls: ['./merkzettel.component.css']
})
export class MerkzettelComponent {
  merkzettelArtikel: Artikel[] = []; // Hier werden die Artikel im Merkzettel gespeichert
  bundles: any = [];
  selectedBundleId: number|undefined;
  selectedBundleLabel: string;

  constructor(private http: HttpClient, private merkzettelService: MerkzettelService, private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.holeMerkzettel();
  }

  // Methode, um Artikel aus dem Merkzettel zu entfernen
  removeItemFromMerkzettel(selectedBundleId: number|undefined, artikel: Artikel) {
    if (selectedBundleId === undefined) {
        return;
    }
    this.merkzettelService.removeItemFromMerkzettel(selectedBundleId, artikel);

    const index = this.merkzettelArtikel.indexOf(artikel);
    if (index !== -1) {
      this.merkzettelArtikel.splice(index, 1);
    }
  }

  /**
   * Hole eine Liste aller Merkzettel
   */
  async holeMerkzettel() {
    // @ts-ignore
    const merkzettel: []|undefined = await this.merkzettelService.holeMerkzettel();

    if (merkzettel !== undefined) {
      for (let id in merkzettel) {
        const bundle: {id: number, label: string} = merkzettel[id];
        const label = bundle.label ? bundle.label : 'Bundle ' + bundle.id;

        // @ts-ignore
        const price: {price: number}|undefined = await this.merkzettelService.berechnePreis(bundle.id);

        this.bundles[id] = {
          id_list: id,
          id: bundle.id,
          label: label,
          preis: price ? price?.price : '-',
          produkte: await this.merkzettelService.holeProdukte(bundle.id)
        };
      }
    }
  }

  /**
   * Zeige die Produkte eines Merkzettels an
   *
   * @param id_list
   */
  zeigeProdukte(id_list: number){
    this.merkzettelArtikel = [];
    this.selectedBundleId = this.bundles[id_list].id;
    this.selectedBundleLabel = this.bundles[id_list].label;

    for (let produkt in this.bundles[id_list].produkte) {
      const artikel: Artikel = this.bundles[id_list].produkte[produkt];
      this.merkzettelArtikel.push(artikel);
    }
  }

  /**
   * Lösche einen Merkzettel vollständig
   *
   * @param id_list
   * @param merkzettelId
   */
  async entferneMerkzettel(id_list: number, merkzettelId: number) {
    await this.merkzettelService.entferneMerkzettel(merkzettelId);
    this.bundles.splice(id_list, 1);
    this.selectedBundleId = undefined;
  }
}
