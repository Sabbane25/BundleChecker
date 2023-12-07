import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KontaktComponent } from './kontakt/kontakt/kontakt.component';
import { MerkzettelComponent } from './merkzettel/merkzettel/merkzettel.component';
import { KonfigurationComponent } from './konfiguration/konfiguration/konfiguration.component';
import { KontoComponent } from './konto/konto/konto.component';
import { DatenschutzComponent } from './hilfe/datenschutz/datenschutz.component';
import { UeberUnsComponent } from './hilfe/ueber-uns/ueber-uns.component';
import { AdminComponent } from './admin/admin/admin.component';
import { SeiteNichtGefundenComponent } from './seite-nicht-gefunden/seite-nicht-gefunden/seite-nicht-gefunden.component';
import { AdminBearbeitenComponent } from './admin/admin-bearbeiten/admin-bearbeiten.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'ueber-uns', component: UeberUnsComponent },
  { path: 'datenschutz', component: DatenschutzComponent },
  { path: 'konto', component: KontoComponent },
  { path: 'konfiguration', component: KonfigurationComponent },
  { path: 'kontakt', component: KontaktComponent },
  { path: 'merkzettel', component: MerkzettelComponent },
  { path: '404', component: SeiteNichtGefundenComponent },
  { path: '', redirectTo:'konfiguration', pathMatch: 'full' },
  { path: 'admin-bearbeiten/:email/:id', component: AdminBearbeitenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
