import { NgModule } from '@angular/core';
import { NgIf } from '@angular/common';
import { AnmeldenComponent } from './anmelden/anmelden.component';
import { KontoComponent } from './konto/konto.component';
import { RouterModule, Routes } from '@angular/router';
import { RegistrierenComponent } from './registrieren/registrieren.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'konto',
    component: KontoComponent,
    children:[
      { path: 'anmelden', component: AnmeldenComponent },
      { path: 'registrieren', component: RegistrierenComponent },
      { path: '', redirectTo: 'anmelden', pathMatch: 'full'},
    ]
  }
]

@NgModule({
  declarations: [
    AnmeldenComponent,
    KontoComponent,
    RegistrierenComponent
  ],
  /*imports: [
    //CommonModule
    
  ]*/
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        NgIf
    ],
  exports: [RouterModule]
})
export class KontoModule { }
