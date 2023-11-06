import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KontaktComponent } from './kontakt/kontakt.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    KontaktComponent
  ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class KontaktModule { }
