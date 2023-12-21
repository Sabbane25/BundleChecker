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
  originalUsers: any[] = [];
  displayedUsers: any[] = [];
  pageSize: number = 5;
  currentPage: number = 1;
  totalItems: number = 0;
  deletedUserSuccess = false;
  deletedUserFail = false;
  loeschenErfolgreichNachricht = '';
  loeschenFehlerNachricht = '';
  disableButton = false;
  isSearching: boolean = false;

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

  
  loadUsers(): void {
    this.nutzerService.getUsers().subscribe((data) => {
      this.originalUsers = data;
  
      // Sortiere die Benutzer numerisch nach der Zahl in der E-Mail
      this.originalUsers.sort((a, b) => {
        const numA = this.extractNumber(a.email);
        const numB = this.extractNumber(b.email);
  
        return numA - numB;
      });
  
      this.totalItems = this.originalUsers.length;
      this.updateDisplayedUsers();
    });
  }
  
  extractNumber(email: string): number {
    const match = email.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0; // Wenn kein Match gefunden wurde, gib 0 zurück
  }

  updateDisplayedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedUsers = this.originalUsers.slice(startIndex, endIndex);
  }

  loadMoreUsers(): void {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updateDisplayedUsers();
    }
  }

  loadPreviousUsers(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedUsers();
    }
  }

  filterUsers(): void {
    const email = this.searchInput.nativeElement.value;
    const lowerCaseSearch = email.toLowerCase();
  
    if (!lowerCaseSearch) {
      this.isSearching = false; // Suche ist nicht aktiv
      this.loadUsers();
    } else {
      this.isSearching = true; // Suche ist aktiv
      this.displayedUsers = this.originalUsers.filter((user) => {
        const lowerCaseEmail = user.email.toLowerCase();
        return lowerCaseEmail.includes(lowerCaseSearch);
      });
  
      this.currentPage = 1; // Zur ersten Seite zurückkehren, wenn die Suche aktiviert wird.
    }
  
    // Deaktiviere die Buttons während der Suche
    this.disableButton = this.isSearching;
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
  
        // Nach dem Löschen die Seite aktualisieren
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