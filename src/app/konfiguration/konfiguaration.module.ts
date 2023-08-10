import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UebersichtComponent } from './uebersicht/uebersicht.component'; // Stellen Sie sicher, dass der Pfad korrekt ist.
import { KonfigurationComponent } from './konfiguration/konfiguration.component';

@NgModule({
  declarations: [UebersichtComponent, KonfigurationComponent], // Hier die Komponenten deklarieren.
  imports: [CommonModule],
  exports: [KonfigurationComponent], // Wenn die KonfigurationComponent exportiert werden muss.
})
export class KonfigurationModule { }
