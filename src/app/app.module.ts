import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KonfigurationModule } from './konfiguration/konfiguration.module';
import { KontaktModule } from './kontakt/kontakt.module';
import { MerkzettelModule } from './merkzettel/merkzettel.module';
import { HttpClientModule } from '@angular/common/http';
import { KontoModule } from './konto/konto.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminModule } from './admin/admin.module';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    AdminModule,
    CommonModule,
    BrowserModule,
    KontoModule,
    KonfigurationModule,
    KontaktModule,
    MerkzettelModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
