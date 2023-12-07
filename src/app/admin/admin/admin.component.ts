import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NutzerService } from 'src/services/nutzer.service';
import { Router } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { Nutzer } from 'src/models/nutzer.model';

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

  constructor(private nutzerService: NutzerService, private router: Router) {}

  ngOnInit(): void {
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
  userLoeschen(user_id: number): void {
    console.log("User wird gelöscht");
    this.nutzerService.loeschen(user_id).subscribe(() => {
      this.deletedUserSuccess = true;
      this.loadUsers();
    },
    error => {
      console.error('Fehler beim Löschen des Users!', error);
      this.deletedUserFail = true;
    }
    );
  }

  //Methode, um zur Passwort-Bearbeiten Seite zu gelangen
  navigateToAdminBearbeiten(email: string, id: number): void {
    console.log(id);
    this.router.navigate(['/admin-bearbeiten', email, id]); //Navigiert zur passenden Seite und übergibt die E-Mail und ID als Parameter, damit diese dort verwendet werden können
}
}
