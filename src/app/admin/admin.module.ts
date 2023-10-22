import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { KontoModule } from '../konto/konto.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AnmeldenComponent } from '../konto/anmelden/anmelden.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children:[
      { path: 'anmelden', component: AnmeldenComponent },
      { path: '', redirectTo: 'anmelden', pathMatch: 'full'},
    ]
  }
]

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule, 
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    KontoModule
  ],
  exports: [RouterModule]
})
export class AdminModule { }
