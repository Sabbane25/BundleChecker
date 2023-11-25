import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UebersichtComponent } from './uebersicht/uebersicht.component'; // Stellen Sie sicher, dass der Pfad korrekt ist.
import { KonfigurationComponent } from './konfiguration/konfiguration.component';
import { RouterModule, Routes } from '@angular/router';
import { ListKomponenteComponent } from './list-komponente/list-komponente.component';
import { DropDownMenuComponent } from '../drop-down-menu/drop-down-menu.component';
import { FilterComponent } from '../filter/filter.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListKomponenteComponent, 
    UebersichtComponent, 
    KonfigurationComponent,
    DropDownMenuComponent,
    FilterComponent,
  ], // Hier die Komponenten deklarieren.
  imports: [CommonModule, FormsModule],
  exports: [KonfigurationComponent], // Wenn die KonfigurationComponent exportiert werden muss.

})
export class KonfigurationModule { }
