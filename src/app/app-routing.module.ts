import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KontaktComponent } from './kontakt/kontakt/kontakt.component';
import { MerkzettelComponent } from './merkzettel/merkzettel/merkzettel.component';
import { KonfigurationComponent } from './konfiguration/konfiguration/konfiguration.component';

const routes: Routes = [
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
