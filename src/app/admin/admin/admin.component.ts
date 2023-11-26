import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NutzerService } from 'src/services/nutzer.service';
import { FormsModule } from '@angular/forms';
import { Nutzer } from 'src/models/nutzer.model';

@Component({
    selector: 'app-admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;

  users: any[] = [];
  userSearch: any[] = [];
  searchQuery: string = ''; // Diese Zeile hinzufügen, um die Eigenschaft zu deklarieren

  constructor(private nutzerService: NutzerService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.nutzerService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
  /**
  searchUser() {
    const suchanfrage = this.searchInput.nativeElement.value;
    this.nutzerService.suchen(suchanfrage).subscribe((searchResults) => {
      this.users = suchanfrage ? searchResults : this.userSearch;
    });
  }
  */

  filterUsers() {
    
    
    const email = this.searchInput.nativeElement.value;
    const lowerCaseSearch = email.toLowerCase();
    console.log("Eingegebene Email: " + lowerCaseSearch);
    
    if (!lowerCaseSearch) {
      this.loadUsers()
    } else {
      this.users = this.users.filter(user => {
        const lowerCaseEmail = user.email.toLowerCase();
        return lowerCaseEmail === lowerCaseSearch;
      });
    }
  }

  userLoeschen(user_id: number): void {
    console.log("User wird gelöscht");
    this.nutzerService.loeschen(user_id).subscribe(() => {
      this.loadUsers();
    });
  }
}
