/*Autor: Tim Hinder*/

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NutzerService } from 'src/services/nutzer.service';
import { Router } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { Nutzer } from 'src/models/nutzer.model';
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
    selector: 'app-admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  //In diesem Array werden alle User aus der DB gesammelt
  users: any[] = [];
  deletedUserSuccess = false;
  deletedUserFail = false;
  loeschenErfolgreichNachricht = '';
  loeschenFehlerNachricht = '';

  constructor(private token: TokenStorageService, private nutzerService: NutzerService, private router: Router) {}

  ngOnInit(): void {
    if (!this.token.isLoggedIn() || !this.token.getUser().roles.includes('ROLE_ADMIN')) {
      this.router.navigate(['/404'], { skipLocationChange: true });
    }

    this.loadUsers();
  }
  //Methode, um die User aus der Datenbank zu bekommen
  loadUsers() {
    this.nutzerService.getUsers().subscribe((data) => {
      this.users = data;
    });

  }

  //Methode, um bestimmte User zu finden(Suchfunktion)
  filterUsers() {
    
    const email = this.searchInput.nativeElement.value;
    const lowerCaseSearch = email.toLowerCase();
    console.log("Eingegebene Email: " + lowerCaseSearch);
    
    if (!lowerCaseSearch) { //Falls kein Suchbegriff eingegeben wurde, werden alle User angezeigt.
      this.loadUsers()
    } else {
      this.users = this.users.filter(user => {
        const lowerCaseEmail = user.email.toLowerCase();
        return lowerCaseEmail.includes(lowerCaseSearch); //Zeige alle User an, dessen E-Mail Adresse ganz oder teilweise mit dem Suchbegriff übereinstimmt.
        
      });
    }
  }
  //Methode, um einen User zu löschen
  userLoeschen(userId: number): void {
    console.log(`User ${userId} wird gelöscht`);
    this.nutzerService.loeschen(userId).subscribe((data) => {
        console.log('User gelöscht!', data);
      this.deletedUserSuccess = true;
      this.deletedUserFail = false;
      // @ts-ignore
      this.loeschenErfolgreichNachricht = data.message;
      this.loadUsers();
    },
    error => {
      console.error('Fehler beim Löschen des Users!', error);
      this.deletedUserFail = true;
      this.deletedUserSuccess = false;
      this.loeschenFehlerNachricht = error?.error?.message ? error.error.message : 'Fehler! User konnte nicht entfernt werden!';
    }
    );
  }

  //Methode, um zur Passwort-Bearbeiten Seite zu gelangen
  navigateToAdminBearbeiten(email: string, id: number): void {
    console.log(id);
    this.router.navigate(['/admin-bearbeiten', email, id]); //Navigiert zur passenden Seite und übergibt die E-Mail und ID als Parameter, damit diese dort verwendet werden können
}
}
