import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KomponentenComponent } from './konfiguration/komponenten/komponenten.component';
import { KontaktComponent } from './kontakt/kontakt/kontakt.component';
import { MerkzettelComponent } from './merkzettel/merkzettel/merkzettel.component';

const routes: Routes = [
  { path: '', component: KomponentenComponent },
  { path: 'konfiguration', component: KomponentenComponent },
  { path: 'kontakt', component: KontaktComponent },
  { path: 'merkzettel', component: MerkzettelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
