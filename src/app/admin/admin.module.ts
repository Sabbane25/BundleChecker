import { NgModule } from '@angular/core';
import { AdminComponent } from './admin/admin.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminBearbeitenComponent } from './admin-bearbeiten/admin-bearbeiten.component';
import {authInterceptorProviders} from "../../helpers/auth.interceptor";


@NgModule({
  declarations: [
    AdminComponent,
    AdminBearbeitenComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    authInterceptorProviders // Fügt x-access-token automatisch zum request header hinzu
  ]
})
export class AdminModule { }
