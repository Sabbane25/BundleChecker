import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { UebersichtComponent } from './uebersicht/uebersicht.component'; // Stellen Sie sicher, dass der Pfad korrekt ist.
import { KonfigurationComponent } from './konfiguration/konfiguration.component';
import { ListKomponenteComponent } from './list-komponente/list-komponente.component';
import { DropDownMenuComponent } from '../drop-down-menu/drop-down-menu.component';
import { FilterComponent } from '../filter/filter.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ListKomponenteComponent, 
    UebersichtComponent, 
    KonfigurationComponent,
    DropDownMenuComponent,
    FilterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [KonfigurationComponent], // Wenn die KonfigurationComponent exportiert werden muss.

})
export class KonfigurationModule { }
