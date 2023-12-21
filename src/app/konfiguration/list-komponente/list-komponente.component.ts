
import { AfterViewInit, Component, ElementRef, Input, Renderer2} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Artikel } from 'src/models/artikel.model';
import { Cpu } from 'src/models/cpu.model';
import { Gehaeuse } from 'src/models/gehaeuse.model';
import { Grafikkarte } from 'src/models/grafikkarte.model';
import { Mainboard } from 'src/models/mainboard.model';
import { Netzteil } from 'src/models/netzteil.model';
import { Speicher } from 'src/models/speicher.model';
import { ArtikelService } from 'src/services/artikel.service';
import { FilterService } from 'src/services/filter.service'; 
import { Filter } from 'src/models/filter.models';
import { Ram } from 'src/models/ram.model';
import { RamService } from 'src/services/ram.service';

@Component({
  selector: 'app-list-komponent',
  templateUrl: 'list-komponente.component.html',
  styleUrls: ['list-komponente.component.css']
})

export class ListKomponenteComponent implements AfterViewInit{

  listeKategorie = ['CPU', 'Festplatte', 'Gehäuse', 'Grafikkarte','Mainboard', 'Netzteil', 'RAM']; // Liste von Kategorien
  artikelliste: Array<{ kategorie: string, artikelListe: Array<{ shop1: Artikel, shop2: Artikel}>}> = []; // Liste von allen Produkten
  backupArtikelliste: Array<{ kategorie: string, artikelListe: Array<{ shop1: Artikel, shop2: Artikel}>}> = []; // Backup Liste von allen Produkten

  hinzugefuegteArtikel: Artikel[] = []; // um selekArtikel zu speichern, die in Übersicht geschickt werden sollen
  hinzugefuegteArtikel2: Array<{ shop1: Artikel, shop2: Artikel}> = []; // Variable zum Speichern der Artikel, die an die Übersicht gesendet werden sollen

  ladeMehrArtikel = 5; // dient als Variable, um die Anzahl der Artikel zu erhöhen, die geladen werden.
  kannNochProdukteLaden = false; // Ermöglicht die Anzeige des Buttons LADE MEHR PRODUKTE, wenn es noch Produkte zum Anzeigen gibt.
  zeigeArtikel2: {kategorie: string, artikelListe: Array<{ shop1: Artikel, shop2: Artikel}>} = {kategorie: '',artikelListe: []}; // 

  isArtikelVorhanden = true; // true wenn der Artikel schon vorhanden ist. (Neu Konfiguration -- liste-komponente (50 - 72))
  dataSubscription: Subscription; // Variable aus meinem Filterservice. Ermöglicht die Kommunikation zwischen der Filter- und der Liste-Komponente.
  loading: boolean = true; // bewirkt eine Ladeanimation, solange die Produkte noch nicht angezeigt werden.

  /**
   * Diese Methode fügt einen Artikel zur Liste der hinzugefügten Artikel hinzu, wenn er noch nicht vorhanden ist.
   * Andernfalls wird eine Meldung ausgegeben, dass mehrere Produkte derselben Kategorie nicht ausgewählt werden können.
   * @param artikelItem Ein Objekt, das Shop1- und Shop2-Artikel enthält.
   */
  onButtonhinzufuegen(artikelItem: { shop1: Artikel; shop2: Artikel; }) {
    let hatschonArtikel = false;
    this.isArtikelVorhanden = true;
    if(this.hinzugefuegteArtikel2.length > 0){
      for(let i = 0; i < this.hinzugefuegteArtikel2.length && hatschonArtikel === false; i++){
        hatschonArtikel = artikelItem.shop1.kategorie === this.hinzugefuegteArtikel2[i].shop1.kategorie;
      }
      if(hatschonArtikel){
        console.log('Mehrere Produkte derselben Kategorie könen nicht ausgewählt werden!');
        this.isArtikelVorhanden = false;
      }else{
        this.hinzugefuegteArtikel2.push(artikelItem);
      }
    }else{
      this.hinzugefuegteArtikel2.push(artikelItem);
    }
  }
  /**
   * Autor: Yahya Sabbane
   */
  zurUebersicht() {
    let hinzugefuegteArtikel: Artikel[] = [];
    for(const artikel of this.hinzugefuegteArtikel2 ){
      hinzugefuegteArtikel.push(artikel.shop1);
      hinzugefuegteArtikel.push(artikel.shop2);
    }
    this.artikelService.updateGuenstigstesArtikel(hinzugefuegteArtikel);
    this.artikelService.updateSchnellstesArtikel(hinzugefuegteArtikel);
    /** 
     * Autor: Arnauld Mba Kuitche
     * Methode aus dem ArtikelService. Ermöglicht das Wechseln der Komponente, 
     * wenn man auf ,,Zur Übersicht'' klickt.
     */
    this.artikelService.wechseltKomponenteFunktion(false);
  }

  /**
   * 
   * Diese Methode sucht nach einem Artikel mit der angegebenen Produkt-URL in der Liste der hinzugefügten Artikel
   * und entfernt ihn, falls vorhanden.
   * @param urlArtikel Die Produkt-URL des zu löschenden Artikels.
   */
  loescheArtikel(urlArtikel: string){
    // Finde den Index des zu löschenden Artikels anhand der Produkt-URL
    const zuloeschendeArtikel = this.hinzugefuegteArtikel2.findIndex(item => item.shop1.produktUrl === urlArtikel);

    // Überprüfe, ob der zu löschende Artikel in der Liste existiert
    if(zuloeschendeArtikel !== -1){ 
      // Lösche den Artikel aus der Liste der hinzugefügten Artikel
      this.hinzugefuegteArtikel2.splice(zuloeschendeArtikel, 1);
    }

    if(this.hinzugefuegteArtikel2.length === 0){
      this.isArtikelVorhanden = true;
    }
  }
  
  constructor(
    private artikelService: ArtikelService, 
    private filterService: FilterService,
    ) {}

  ngOnInit(): void {
    /*setTimeout(() => {
      // Après avoir reçu les éléments (simulé ici avec un délai de 2 secondes)
      this.loading = false;
    }, 2000);*/
    this.gibGleichteFestplatte();
    this.gibGleichteRam();
    this.gibGleichteMainboard();
    this.gibGleichteNetzteil();
    this.gibGleichteGrafikkarte();
    this.gibGleichteGehaeuse();
    this.gibGleichteCPU();
    this.filterArtikel();
  }

  /**
  * Diese Methode abonniert Änderungen im FilterService und passt die Anzeige der Artikel entsprechend an.
  * Das Ziel ist, die Artikel nach den vom Nutzer eingegebenen Kriterien zu filtern.
  */
  filterArtikel(){
    // Abonnement auf die Datenänderungen im FilterService
    this.dataSubscription = this.filterService.dataFilter$.subscribe(data => {

       // Extrahiere die Filterdaten (Kommt aus der Filter in list-komponente)
      let artikelFilter: Filter = data;
  
      for(let artikel of this.artikelliste){
        // Liste für gefilterte Artikel initialisieren
        let gefilterteListe: Array<{ shop1: Artikel, shop2: Artikel }> = [] ;
  
        // Überprüfe, ob die Kategorie des aktuellen Artikels mit der gefilterten Kategorie übereinstimmt und der Filter nicht abgebrochen wurde
        if(artikel.kategorie === artikelFilter.artikelKategorie && artikelFilter.brecheFilterAb){
          // Überprüfe, ob Filterkriterien vorhanden sind (Checkboxen, Preis)
          if((artikelFilter.checkbox.size != 0 || artikelFilter.preis.von > 0 || artikelFilter.preis.bis > 0)){
            // Filtere die Liste basierend auf der Artikelkategorie
            if(artikel.kategorie === 'CPU'){
              gefilterteListe = Cpu.filterByMapCriteria(artikel.artikelListe, artikelFilter);
            }else if(artikel.kategorie === 'Festplatte'){
              gefilterteListe = Speicher.filterByMapCriteria(artikel.artikelListe, artikelFilter);
            }else if(artikel.kategorie === 'Gehäuse'){
              gefilterteListe = Gehaeuse.filterByMapCriteria(artikel.artikelListe, artikelFilter);
            }else if(artikel.kategorie === 'Grafikkarte'){
              gefilterteListe = Grafikkarte.filterByMapCriteria(artikel.artikelListe, artikelFilter);
            }else if(artikel.kategorie === 'Mainboard'){
              gefilterteListe = Mainboard.filterByMapCriteria(artikel.artikelListe, artikelFilter);
            }else if(artikel.kategorie === 'Netzteil'){
              gefilterteListe = Netzteil.filterByMapCriteria(artikel.artikelListe, artikelFilter);
            }else if(artikel.kategorie === 'RAM'){
              gefilterteListe = Ram.filterByMapCriteria(artikel.artikelListe, artikelFilter);
            }
            
            // Ausgabe der Anzahl der Treffer
            console.log('Anzahl Treffer: ', gefilterteListe.length);

            // Aktualisiere die Anzeige der Artikel
            this.zeigeArtikel2.artikelListe = gefilterteListe;
            artikelFilter.filterZustant = true;

            // Überprüfe, ob keine Treffer vorhanden sind
            if(gefilterteListe.length === 0){
              //this.artikelService.hatArtikel = false;
              this.artikelService.hatArtikel = false;
            }
          }
        } else if(artikel.kategorie === artikelFilter.artikelKategorie && artikelFilter.brecheFilterAb === false){
          // Wenn der Filter nicht abgebrochen wurde, setze die Anzeige auf die ursprüngliche Liste zurück
          for(const artikelliste of this.backupArtikelliste){
            if(artikelliste.kategorie === artikelFilter.artikelKategorie){
              this.zeigeArtikel2.artikelListe = this.gibMehereProdukte(artikelliste.kategorie);
              this.artikelService.hatArtikel = true;
            }
          }
        }
      }
     });
  }

  /**
   * Diese Methode gibt eine Liste von Artikeln aus der Artikelliste zurück, basierend auf der angegebenen Kategorie.
   * @param kategorie Die Kategorie, für die die Artikel abgerufen werden sollen.
   * @returns Eine Liste von Artikeln als Array von Objekten mit Shop1- und Shop2-Artikeln.
   */
  gibMehereProdukte( kategorie: string): Array<{ shop1: Artikel, shop2: Artikel}>{
    let listeArtikel: Array<{ shop1: Artikel, shop2: Artikel}> = []; // Initialisiere die Liste der Artikel

    // Iteriere durch die Artikelliste
    for(const artikel of this.artikelliste){
      // Überprüfe, ob die Kategorie übereinstimmt
      if(artikel.kategorie === kategorie){
        for(let i = 0; i < this.ladeMehrArtikel && artikel.artikelListe.length > listeArtikel.length ; i++){
          listeArtikel.push(artikel.artikelListe[i]);
        }
      }
    }

    // Überprüfe, ob noch mehr Artikel geladen werden können
    if(this.ladeMehrArtikel - listeArtikel.length > 0){
      console.log(this.ladeMehrArtikel, 'Kein Produkte mehr');
      this.kannNochProdukteLaden = true;
    }
    return listeArtikel;
  }

  /**
   * Die Methode 'ladeProdukte' wird verwendet, um weitere Produkte zu laden und sie der angezeigten Produktliste hinzuzufügen.
   * @param {string} kategorie - Die Produktkategorie, für die weitere Produkte geladen werden sollen.
   * @returns {void}
   */
  ladeProdukte(kategorie: string): void{
    this.ladeMehrArtikel = this.ladeMehrArtikel + 5;
    this.zeigeArtikel2.kategorie = kategorie;
    this.zeigeArtikel2.artikelListe = this.gibMehereProdukte(kategorie);
  }

  /**
   * Diese Methode reagiert auf den Klick auf einen Button. Sie zeigt alle Artikel einer Kategorie an.
   * @param kategorie 
   */
  setzeLadeMehrProdukteZurueck(kategorie: string){
    this.loading = true;
    this.ladeMehrArtikel = 5;
    this.kannNochProdukteLaden = false;
    this.zeigeArtikel2.kategorie = kategorie;
    setTimeout(() => {
      this.zeigeArtikel2.artikelListe = this.gibMehereProdukte(kategorie);
      this.loading = false;
    }, 500);
  }

  ngAfterViewInit(): void {
  }

 /**
 * Diese generische Methode ermöglicht das Abrufen von Daten durch Übergabe einer Funktion,
 * die eine Liste von Werten vom Typ T zurückgibt.
 * @param gibListeFn Die Funktion, die die Daten abruft (shopId, kategorie) => Observable<T[]>
 * @param shopId Die ID des Shops, für den die Daten abgerufen werden sollen.
 * @param kategorie Die Kategorie, für die die Daten abgerufen werden sollen.
 * @returns Ein Promise, das eine Liste von Werten vom Typ T enthält.
 */
  rufeDataService2<T>(gibListeFn: (shopId: number, kategorie: string) => Observable<T[]>, shopId: number, kategorie: string): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      // Die übergebene Funktion aufrufen und auf das Observable subscriben
      gibListeFn(shopId, kategorie).subscribe(
        (dataList) => {
          resolve(dataList);
        },
        // Im Fehlerfall das Promise mit dem Fehler ablehnen
        (error) => {
          reject(error);
        }
      );
    });
  }

  // Methode, um gleiche Festplatten zu vergleichen
  async gibGleichteFestplatte() {
    try{
      let vergleichenenArtikelliste: Array<{ shop1: Artikel, shop2: Artikel}> = [];
      const listeFestplatteShop1: Speicher[] = await this.rufeDataService2<Speicher>(this.artikelService.gibListeFestplatte.bind(this.artikelService), 1, 'Festplatte');
      const listeFestplatteShop2: Speicher[] = await this.rufeDataService2<Speicher>(this.artikelService.gibListeFestplatte.bind(this.artikelService), 2, 'Festplatte');

      for(const festplatteId1 of listeFestplatteShop1){
        let isGleichArikel = false; 
        for(const festplatteId2 of listeFestplatteShop2){
          if(festplatteId1.lesen === festplatteId2.lesen 
            && festplatteId1.schreiben === festplatteId2.schreiben
            && festplatteId1.kapazitaet === festplatteId2.kapazitaet
            && isGleichArikel === false){
              vergleichenenArtikelliste.push({ shop1: festplatteId1, shop2: festplatteId2 });           
              isGleichArikel = true;
          }
        }
      }
      this.artikelliste.push({ kategorie: 'Festplatte', artikelListe: vergleichenenArtikelliste.slice()});
      this.backupArtikelliste.push({ kategorie: 'Festplatte', artikelListe: vergleichenenArtikelliste.slice()});
    }catch (error){
      console.error('Erreur während des La');
    }
  }

  // Methode, um gleiche RAM zu vergleichen
  async gibGleichteRam() {
    try{
      let vergleichenenArtikelliste: Array<{ shop1: Artikel, shop2: Artikel}> = [];
      const listeRamShop1: Ram[] = await this.rufeDataService2<Ram>(this.artikelService.gibListeRam.bind(this.artikelService), 1, 'RAM');
      const listeRamShop2: Ram[] = await this.rufeDataService2<Ram>(this.artikelService.gibListeRam.bind(this.artikelService), 2, 'RAM');

      for(const festplatteId1 of listeRamShop1){
        let isGleichArikel = false; 
        for(const festplatteId2 of listeRamShop2){
          if(festplatteId1.latency === festplatteId2.latency 
            && festplatteId1.marke === festplatteId2.marke
            && festplatteId1.kapazitaet === festplatteId2.kapazitaet
            && festplatteId1.spannung === festplatteId2.spannung
            && isGleichArikel === false){
              vergleichenenArtikelliste.push({ shop1: festplatteId1, shop2: festplatteId2 });
              isGleichArikel = true;
          }
        }
      }
      this.artikelliste.push({ kategorie: 'RAM', artikelListe: vergleichenenArtikelliste.slice()});
      this.backupArtikelliste.push({ kategorie: 'RAM', artikelListe: vergleichenenArtikelliste.slice()});
    }catch (error){
      console.error('Erreur während des La');
    }
  }

  // Methode, um gleiche Mainboard zu vergleichen
  async gibGleichteMainboard() {
    try{
      let vergleichenenArtikelliste: Array<{ shop1: Artikel, shop2: Artikel}> = [];
      const listeMainboardShop1: Mainboard[] = await this.rufeDataService2<Mainboard>(this.artikelService.gibListeMainboard.bind(this.artikelService), 1, 'Mainboard');
      const listeMainboardShop2: Mainboard[] = await this.rufeDataService2<Mainboard>(this.artikelService.gibListeMainboard.bind(this.artikelService), 2, 'Mainboard');

      for(const mainboardId1 of listeMainboardShop1){
        let isGleichArikel = false; 
        for(const mainboardId2 of listeMainboardShop2){
          if(mainboardId1.chipsatz === mainboardId2.chipsatz 
            && mainboardId1.marke === mainboardId2.marke
            && mainboardId1.formfaktor === mainboardId2.formfaktor
            && mainboardId1.maxRam === mainboardId2.maxRam
            && isGleichArikel === false){
              vergleichenenArtikelliste.push({ shop1: mainboardId1, shop2: mainboardId2 });
              isGleichArikel = true;
          }
        }
      }
      this.artikelliste.push({ kategorie: 'Mainboard', artikelListe: vergleichenenArtikelliste.slice()});
      this.backupArtikelliste.push({ kategorie: 'Mainboard', artikelListe: vergleichenenArtikelliste.slice()});
    }catch (error){
      console.error('Erreur während des La');
    }
  }

  // Methode, um gleiche Netzteile zu vergleichen
  async gibGleichteNetzteil() {
    try{
      let vergleichenenArtikelliste: Array<{ shop1: Artikel, shop2: Artikel}> = [];
      const listeNetzteilShop1: Netzteil[] = await this.rufeDataService2<Netzteil>(this.artikelService.gibListeNetzteil.bind(this.artikelService), 1, 'Netzteil');
      const listeNetzteilShop2: Netzteil[] = await this.rufeDataService2<Netzteil>(this.artikelService.gibListeNetzteil.bind(this.artikelService), 2, 'Netzteil');

      for(const mainboardId1 of listeNetzteilShop1){
        let isGleichArikel = false; 
        for(const mainboardId2 of listeNetzteilShop2){
          if(mainboardId1.marke === mainboardId2.marke 
            && mainboardId1.bauform === mainboardId2.bauform
            && mainboardId1.leistung === mainboardId2.leistung
            && mainboardId1.zertifizierung === mainboardId2.zertifizierung
            && isGleichArikel === false){
              vergleichenenArtikelliste.push({ shop1: mainboardId1, shop2: mainboardId2 });
              isGleichArikel = true;
          }
        }
      }
      this.artikelliste.push({ kategorie: 'Netzteil', artikelListe: vergleichenenArtikelliste.slice()});
      this.backupArtikelliste.push({ kategorie: 'Netzteil', artikelListe: vergleichenenArtikelliste.slice()});
    }catch (error){
      console.error('Erreur während des La');
    }
  }

  // Methode, um gleiche Grafikkarte zu vergleichen
  async gibGleichteGrafikkarte() {
    try{
      let vergleichenenArtikelliste: Array<{ shop1: Artikel, shop2: Artikel}> = [];
      const listeGrafikkarteShop1: Grafikkarte[] = await this.rufeDataService2<Grafikkarte>(this.artikelService.gibListeGrafikkarte.bind(this.artikelService), 1, 'Grafikkarte');
      const listeGrafikkarteShop2: Grafikkarte[] = await this.rufeDataService2<Grafikkarte>(this.artikelService.gibListeGrafikkarte.bind(this.artikelService), 2, 'Grafikkarte');

      for(const grafikkarteId1 of listeGrafikkarteShop1){
        let isGleichArikel = false; 
        for(const grafikkarteId2 of listeGrafikkarteShop2){
          if(grafikkarteId1.marke === grafikkarteId2.marke 
            && grafikkarteId1.kapazitaet === grafikkarteId2.kapazitaet
            //&& mainboardId1.model === mainboardId2.model
            && grafikkarteId1.streamProzessoren === grafikkarteId2.streamProzessoren
            && grafikkarteId1.verbrauch === grafikkarteId2.verbrauch
            && isGleichArikel === false){
              vergleichenenArtikelliste.push({ shop1: grafikkarteId1, shop2: grafikkarteId2 });
              isGleichArikel = true;
          }
        }
      }
      this.artikelliste.push({ kategorie: 'Grafikkarte', artikelListe: vergleichenenArtikelliste.slice()});
      this.backupArtikelliste.push({ kategorie: 'Grafikkarte', artikelListe: vergleichenenArtikelliste.slice()});
    }catch (error){
      console.error('Erreur während des La');
    }
  }

  // Methode, um gleiche Gehäuse zu vergleichen
  async gibGleichteGehaeuse() {
    try{
      let vergleichenenArtikelliste: Array<{ shop1: Artikel, shop2: Artikel}> = [];
      const listeGehaeuseShop1: Gehaeuse[] = await this.rufeDataService2<Gehaeuse>(this.artikelService.gibListeGehaeuse.bind(this.artikelService), 1, 'Gehäuse');
      const listeGehaeuseShop2: Gehaeuse[] = await this.rufeDataService2<Gehaeuse>(this.artikelService.gibListeGehaeuse.bind(this.artikelService), 2, 'Gehäuse');

      for(const gehaeuseId1 of listeGehaeuseShop1){
        let isGleichArikel = false; 
        for(const gehaeuseId2 of listeGehaeuseShop2){
          if(gehaeuseId1.marke === gehaeuseId2.marke 
            && gehaeuseId1.gewicht === gehaeuseId2.gewicht
            && isGleichArikel === false){
              vergleichenenArtikelliste.push({ shop1: gehaeuseId1, shop2: gehaeuseId2 });
              isGleichArikel = true;
          }
        }
      }
      this.artikelliste.push({ kategorie: 'Gehäuse', artikelListe: vergleichenenArtikelliste.slice()});
      this.backupArtikelliste.push({ kategorie: 'Gehäuse', artikelListe: vergleichenenArtikelliste.slice()});
    }catch (error){
      console.error('Erreur während des La');
    }
  }

  // Methode, um gleiche CPUs zu vergleichen
  async gibGleichteCPU() {
    try{
      let vergleichenenArtikelliste: Array<{ shop1: Artikel, shop2: Artikel}> = [];
      const listeCPUShop1: Cpu[] = await this.rufeDataService2<Cpu>(this.artikelService.gibListeCPU.bind(this.artikelService), 1, 'CPU');
      const listeCPUShop2: Cpu[] = await this.rufeDataService2<Cpu>(this.artikelService.gibListeCPU.bind(this.artikelService), 2, 'CPU');

      for(const cpuId1 of listeCPUShop1){
        let isGleichArikel = false; 
        for(const cpuId2 of listeCPUShop2){
          if(cpuId1.marke === cpuId2.marke 
            && cpuId1.interneGrafik === cpuId2.interneGrafik
            && cpuId1.marke === cpuId2.marke
            && cpuId1.stromverbrauch === cpuId2.stromverbrauch
            && cpuId1.anzahlKerne === cpuId2.anzahlKerne
            && isGleichArikel === false){
              vergleichenenArtikelliste.push({ shop1: cpuId1, shop2: cpuId2 });
              isGleichArikel = true;
          }
        }
      }
      this.artikelliste.push({ kategorie: 'CPU', artikelListe: vergleichenenArtikelliste.slice()}); 
      this.backupArtikelliste.push({ kategorie: 'CPU', artikelListe: vergleichenenArtikelliste.slice()});
    }catch (error){
      console.error('Erreur während des Ladens');
    }
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe(); // Pour éviter les fuites de mémoire
  }
  
}