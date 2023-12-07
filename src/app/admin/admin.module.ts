import { NgModule } from '@angular/core';
import { AdminComponent } from './admin/admin.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminBearbeitenComponent } from './admin-bearbeiten/admin-bearbeiten.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminBearbeitenComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AdminModule { }
