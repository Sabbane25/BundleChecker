import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KontaktComponent } from './kontakt/kontakt/kontakt.component';
import { MerkzettelComponent } from './merkzettel/merkzettel/merkzettel.component';
import { KonfigurationComponent } from './konfiguration/konfiguration/konfiguration.component';
import { KontoComponent } from './konto/konto/konto.component';
import { DatenschutzComponent } from './hilfe/datenschutz/datenschutz.component';
import { UeberUnsComponent } from './hilfe/ueber-uns/ueber-uns.component';

const routes: Routes = [
  { path: 'ueber-uns', component: UeberUnsComponent },
  { path: 'datenschutz', component: DatenschutzComponent },
  { path: 'konto', component: KontoComponent },
  { path: 'konfiguration', component: KonfigurationComponent },
  { path: 'kontakt', component: KontaktComponent },
  { path: 'merkzettel', component: MerkzettelComponent },
  { path: '', redirectTo:'konfiguration', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
