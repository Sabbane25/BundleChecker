import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NutzerService } from 'src/services/nutzer.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.css']
})
export class AdminComponent implements OnInit {

  //@ViewChild('emailInput', { static: false }) emailInput: ElementRef;

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

  onClick(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchUser();
    }
  }

  searchUser() {
    const suchanfrage = this.searchQuery;
    this.nutzerService.suchen(suchanfrage).subscribe((searchResults) => {
      this.users = suchanfrage ? searchResults : this.userSearch;
    });
  }

  userLoeschen(user_id: number): void {
    console.log("User wird gelöscht");
    this.nutzerService.loeschen(user_id).subscribe(() => {
      this.loadUsers();
    });
  }
}
