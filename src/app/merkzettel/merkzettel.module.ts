import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerkzettelComponent } from './merkzettel/merkzettel.component';
import {authInterceptorProviders} from "../../helpers/auth.interceptor";
import {HttpClientModule} from "@angular/common/http";


/**
 * @autor Mokhtar Yosofzay
 */
@NgModule({
  declarations: [
    MerkzettelComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    authInterceptorProviders // Fügt x-access-token automatisch zum request header hinzu
  ]
})
export class MerkzettelModule { }
