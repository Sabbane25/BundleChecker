//Autor: Tim Hinder
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NutzerService } from 'src/services/nutzer.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/services/token-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css'],
})
export class AdminComponent implements OnInit {
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  users: any[] = [];
  displayedUsers: any[] = [];
  pageSize: number = 5;
  deletedUserSuccess = false;
  deletedUserFail = false;
  loeschenErfolgreichNachricht = '';
  loeschenFehlerNachricht = '';

  constructor(
    private token: TokenStorageService,
    private nutzerService: NutzerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (
      !this.token.isLoggedIn() ||
      !this.token.getUser().roles.includes('ROLE_ADMIN')
    ) {
      this.router.navigate(['/404'], { skipLocationChange: true });
    }

    this.loadUsers();
  }

  loadUsers() {
    this.nutzerService.getUsers().subscribe((data) => {
      this.users = data;
      this.updateDisplayedUsers();
    });
  }

  updateDisplayedUsers() {
    this.displayedUsers = this.users.slice(0, this.pageSize);
  }

  loadMoreUsers() {
    const startIndex = this.displayedUsers.length;
    const endIndex = startIndex + this.pageSize;
    if (startIndex < this.users.length) {
      this.displayedUsers = [
        ...this.displayedUsers,
        ...this.users.slice(startIndex, endIndex),
      ];
    }
  }

  filterUsers() {
    const email = this.searchInput.nativeElement.value;
    const lowerCaseSearch = email.toLowerCase();
    
    if (!lowerCaseSearch) {
      this.loadUsers();
    } else {
      this.users = this.users.filter(user => {
        const lowerCaseEmail = user.email.toLowerCase();
        return lowerCaseEmail.includes(lowerCaseSearch);
      });
      this.updateDisplayedUsers();
    }
  }

  userLoeschen(userId: number): void {
    console.log(`User ${userId} wird gelöscht`);
    this.nutzerService.loeschen(userId).subscribe(
      (data) => {
        console.log('User gelöscht!', data);
        this.deletedUserSuccess = true;
        this.deletedUserFail = false;
        // @ts-ignore
        this.loeschenErfolgreichNachricht = data.message;
        this.loadUsers();
      },
      (error) => {
        console.error('Fehler beim Löschen des Users!', error);
        this.deletedUserFail = true;
        this.deletedUserSuccess = false;
        this.loeschenFehlerNachricht = error?.error?.message
          ? error.error.message
          : 'Fehler! User konnte nicht entfernt werden!';
      }
    );
  }

  navigateToAdminBearbeiten(email: string, id: number): void {
    console.log(id);
    this.router.navigate(['/admin-bearbeiten', email, id]);
  }
}