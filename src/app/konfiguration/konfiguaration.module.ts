import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UebersichtComponent } from './uebersicht/uebersicht.component';
import { KomponentenComponent } from './komponenten/komponenten.component';



@NgModule({
  declarations: [
    UebersichtComponent,
    KomponentenComponent
  ],
  imports: [
    CommonModule
  ]
})
export class KonfiguarationModule { }
