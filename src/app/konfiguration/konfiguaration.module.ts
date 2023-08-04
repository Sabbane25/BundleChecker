import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UebersichtComponent } from './uebersicht/uebersicht.component';
import { ListKomponenteComponent } from './list-komponente/list-komponente.component';
import { KonfigurationComponent } from './konfiguration/konfiguration.component';



@NgModule({
  declarations: [
    KonfigurationComponent,
    UebersichtComponent,
    ListKomponenteComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class KonfiguarationModule { }
