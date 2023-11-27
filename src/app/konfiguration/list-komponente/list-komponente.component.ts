import { Component, ElementRef, Input, Renderer2} from '@angular/core';
import { Observable } from 'rxjs';
import { Artikel } from 'src/models/artikel.model';
import { Cpu } from 'src/models/cpu.model';
import { Gehaeuse } from 'src/models/gehaeuse.model';
import { Grafikkarte } from 'src/models/grafikkarte.model';
import { Mainboard } from 'src/models/mainboard.model';
import { Netzteil } from 'src/models/netzteil.model';
import { Ram } from 'src/models/ram.model';
import { Speicher } from 'src/models/speicher.model';
import { ArtikelService } from 'src/services/artikel.service';

@Component({
  selector: 'app-list-komponent',
  templateUrl: 'list-komponente.component.html',
  styleUrls: ['list-komponente.component.css']
})

export class ListKomponenteComponent {

  @Input() testFilter: any[] = ["test", "test"];

  listeKategorie = ['CPU', 'Festplatte', 'Gehaeuse', 'Grafikkarte','Mainboard', 'Netzteil', 'RAM'];
  artikelListe: Array<{ kategorie: string, shop1: Artikel, shop2: Artikel }> = [];
  // Déclarez un type générique T qui peut être n'importe quel type
  

  sortierteArtikelListe: Array<{ kategorie: string, liste1: Artikel[], liste2: Artikel[] }> = [];
  hinzugefuegteArtikel: Artikel[] = []; // Um Artikel im neu Kontiguration aufzulisten / zur Übersicht - Funktion

  onButtonhinzufuegen(artikel: Artikel) {
    this.hinzugefuegteArtikel.push(artikel);
  }

  constructor(
      private artikelService: ArtikelService) {}

  ngOnInit(): void {
   this.gibGleichteFestplatte();
   this.gibGleichteRam();
   this.gibGleichteMainboard();
   this.gibGleichteNetzteil();
   this.gibGleichteGrafikkarte();
   this.gibGleichteGehaeuse();
  }
  

  rufeDataService<T>(shopId: number, kategorie: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.artikelService.gibListeFestplatte(shopId, kategorie).subscribe(
        (dataList) => {
          resolve(dataList as T[]);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  ladeFestplatteData(shopId: number, kategorie: string): Promise<Speicher[]> {
    return this.rufeDataService(shopId, kategorie);
  }

  ladeRamData(shopId: number, kategorie: string): Promise<Ram[]> {
    return new Promise((resolve, reject) => {
      this.artikelService.gibListeRam(shopId, kategorie).subscribe(
        (festplatteListe) => {
          resolve(festplatteListe);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  ladeMainboardData(shopId: number, kategorie: string): Promise<Mainboard[]> {
    return new Promise((resolve, reject) => {
      this.artikelService.gibListeMainboard(shopId, kategorie).subscribe(
        (mainboardListe) => {
          resolve(mainboardListe);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  ladeNetzteilData(shopId: number, kategorie: string): Promise<Netzteil[]> {
    return new Promise((resolve, reject) => {
      this.artikelService.gibListeNetzteil(shopId, kategorie).subscribe(
        (mainboardListe) => {
          resolve(mainboardListe);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  ladeGrafikkarteData(shopId: number, kategorie: string): Promise<Grafikkarte[]> {
    return new Promise((resolve, reject) => {
      this.artikelService.gibListeGrafikkarte(shopId, kategorie).subscribe(
        (mainboardListe) => {
          resolve(mainboardListe);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  ladeGehaeuseData(shopId: number, kategorie: string): Promise<Gehaeuse[]> {
    return new Promise((resolve, reject) => {
      this.artikelService.gibListeGehaeuse(shopId, kategorie).subscribe(
        (gehaeuseListe) => {
          resolve(gehaeuseListe);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async gibGleichteFestplatte() {
    try{
      const listeFestplatteShop1: Speicher[] = await this.ladeFestplatteData(1, 'Festplatte');
      const listeFestplatteShop2: Speicher[] = await this.ladeFestplatteData(2, 'Festplatte');

      for(const festplatteId1 of listeFestplatteShop1){
        let isGleichArikel = false; 
        for(const festplatteId2 of listeFestplatteShop2){
          if(festplatteId1.lesen === festplatteId2.lesen 
            && festplatteId1.schreiben === festplatteId2.schreiben
            && festplatteId1.kapazitaet === festplatteId2.kapazitaet
            && isGleichArikel === false){
              this.artikelListe.push({ kategorie:"Festplatte", shop1: festplatteId1, shop2: festplatteId2 });
              isGleichArikel = true;
          }
        }
      }
      for(let artikel of this.artikelListe){
        console.log(artikel.kategorie);
      }
      console.log(this.artikelListe);
    }catch (error){
      console.error('Erreur während des La');
    }
  }

  async gibGleichteRam() {
    try{
      const listeRamShop1: Ram[] = await this.ladeRamData(1, 'RAM');
      const listeRamShop2: Ram[] = await this.ladeRamData(2, 'RAM');

      for(const festplatteId1 of listeRamShop1){
        let isGleichArikel = false; 
        for(const festplatteId2 of listeRamShop2){
          if(festplatteId1.latency === festplatteId2.latency 
            && festplatteId1.marke === festplatteId2.marke
            && festplatteId1.kapazitaet === festplatteId2.kapazitaet
            && festplatteId1.spannung === festplatteId2.spannung
            && isGleichArikel === false){
              this.artikelListe.push({ kategorie:"RAM", shop1: festplatteId1, shop2: festplatteId2 });
              isGleichArikel = true;
          }
        }
      }
      for(let artikel of this.artikelListe){
        console.log(artikel.kategorie);
      }
      console.log(this.artikelListe);
    }catch (error){
      console.error('Erreur während des La');
    }
  }

  async gibGleichteMainboard() {
    try{
      const listeMainboardShop1: Mainboard[] = await this.ladeMainboardData(1, 'Mainboard');
      const listeMainboardShop2: Mainboard[] = await this.ladeMainboardData(2, 'Mainboard');

      for(const mainboardId1 of listeMainboardShop1){
        let isGleichArikel = false; 
        for(const mainboardId2 of listeMainboardShop2){
          if(mainboardId1.chipsatz === mainboardId2.chipsatz 
            && mainboardId1.marke === mainboardId2.marke
            && mainboardId1.formfaktor === mainboardId2.formfaktor
            && mainboardId1.maxRam === mainboardId2.maxRam
            && isGleichArikel === false){
              this.artikelListe.push({ kategorie:"Mainboard", shop1: mainboardId1, shop2: mainboardId2 });
              isGleichArikel = true;
          }
        }
      }
      for(let artikel of this.artikelListe){
        console.log(artikel.kategorie);
      }
      console.log(this.artikelListe);
    }catch (error){
      console.error('Erreur während des La');
    }
  }

  async gibGleichteNetzteil() {
    try{
      const listeNetzteilShop1: Netzteil[] = await this.ladeNetzteilData(1, 'Netzteil');
      const listeNetzteilShop2: Netzteil[] = await this.ladeNetzteilData(2, 'Netzteil');

      for(const mainboardId1 of listeNetzteilShop1){
        let isGleichArikel = false; 
        for(const mainboardId2 of listeNetzteilShop2){
          if(mainboardId1.marke === mainboardId2.marke 
            && mainboardId1.bauform === mainboardId2.bauform
            //&& mainboardId1.leistung === mainboardId2.leistung
            && mainboardId1.zertifizierung === mainboardId2.zertifizierung
            && isGleichArikel === false){
              this.artikelListe.push({ kategorie:"Netzteil", shop1: mainboardId1, shop2: mainboardId2 });
              isGleichArikel = true;
          }
        }
      }
      for(let artikel of this.artikelListe){
        console.log(artikel.kategorie);
      }
      console.log(this.artikelListe);
    }catch (error){
      console.error('Erreur während des La');
    }
  }

  async gibGleichteGrafikkarte() {
    try{
      const listeGrafikkarteShop1: Grafikkarte[] = await this.ladeGrafikkarteData(1, 'Grafikkarte');
      const listeGrafikkarteShop2: Grafikkarte[] = await this.ladeGrafikkarteData(2, 'Grafikkarte');

      for(const mainboardId1 of listeGrafikkarteShop1){
        let isGleichArikel = false; 
        for(const mainboardId2 of listeGrafikkarteShop2){
          if(mainboardId1.marke === mainboardId2.marke 
            && mainboardId1.kapazitaet === mainboardId2.kapazitaet
            //&& mainboardId1.model === mainboardId2.model
            && mainboardId1.streamProzessoren === mainboardId2.streamProzessoren
            && mainboardId1.verbrauch === mainboardId2.verbrauch
            && isGleichArikel === false){
              this.artikelListe.push({ kategorie:"Grafikkarte", shop1: mainboardId1, shop2: mainboardId2 });
              isGleichArikel = true;
          }
        }
      }
      for(let artikel of this.artikelListe){
        console.log(artikel.kategorie);
      }
      console.log(this.artikelListe);
    }catch (error){
      console.error('Erreur während des La');
    }
  }

  async gibGleichteGehaeuse() {
    try{
      const listeGehaeuseShop1: Gehaeuse[] = await this.ladeGehaeuseData(1, 'Gehäuse');
      const listeGehaeuseShop2: Gehaeuse[] = await this.ladeGehaeuseData(2, 'Gehäuse');

      for(const mainboardId1 of listeGehaeuseShop1){
        let isGleichArikel = false; 
        for(const mainboardId2 of listeGehaeuseShop2){
          if(mainboardId1.marke === mainboardId2.marke 
            //&& mainboardId1.formfaktor === mainboardId2.formfaktor
            //&& mainboardId1.model === mainboardId2.model
            //&& mainboardId1.frontenschluesse === mainboardId2.frontenschluesse
            //&& mainboardId1.typ === mainboardId2.typ
            && mainboardId1.gewicht === mainboardId2.gewicht
            && isGleichArikel === false){
              this.artikelListe.push({ kategorie:"Gehaeuse", shop1: mainboardId1, shop2: mainboardId2 });
              isGleichArikel = true;
          }
        }
      }
      for(let artikel of this.artikelListe){
        console.log(artikel.kategorie);
      }
      console.log(this.artikelListe);
    }catch (error){
      console.error('Erreur während des La');
    }
  }
}