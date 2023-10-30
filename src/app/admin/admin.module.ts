import { NgModule } from '@angular/core';
import { AdminComponent } from './admin/admin.component';
import { CommonModule } from '@angular/common';

/*const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children:[
      { path: '', redirectTo: 'admin', pathMatch: 'full'},
    ]
  }
]*/

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [CommonModule]
})
export class AdminModule { }
