import { Component } from '@angular/core';

interface Bundle {
  id: number;
  components: any[];
}

@Component({
  selector: 'app-uebersicht',
  templateUrl: './uebersicht.component.html',
  styleUrls: ['./uebersicht.component.css']
})
export class UebersichtComponent {
  bundles: Bundle[] = [
    { id: 1, components: [{ kategorie: 'Prozessor',produkt: 'AMD Ryzen™ 7 5800X', price: 200 }, { kategorie: 'Grafikkarte', produkt: 'MSI GeForce RTX 3060 GAMING X 12G', price: 319 }] },
    { id: 2, components: [{ kategorie: 'Prozessor',produkt: 'AMD Ryzen™ 5 5600X', price: 300 }, { kategorie: 'Grafikkarte', produkt: 'Acer PREDATOR BIFROST Intel® Arc A770 OC', price: 349 }] }
    // Weitere Bundles hier hinzufügen
  ];

  selectedComponents: any[] = [
    // ...
  ];

  confirmConfiguration(bundle: Bundle) {
    // Hier können Sie die Logik für die Bestätigung der Konfiguration hinzufügen
    console.log(`Konfiguration für Bundle ${bundle.id} bestätigt!`);
  }

  editConfiguration(bundle: Bundle) {
    // Hier können Sie die Logik für die Bearbeitung der Konfiguration hinzufügen
    console.log(`Konfiguration für Bundle ${bundle.id} bearbeitet!`);
  }
  
  calculateTotalPrice(bundle: Bundle): number {
    // Summieren Sie die Preise aller ausgewählten Komponenten in einem Bundle
    let totalPrice = 0;
    for (const component of bundle.components) {
      totalPrice += component.price;
    }
    return totalPrice;
  }
}
