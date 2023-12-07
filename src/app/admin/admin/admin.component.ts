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

  users: any[] = [];
  userSearch: any[] = [];
  searchQuery: string = ''; 

  constructor(private nutzerService: NutzerService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.nutzerService.getUsers().subscribe((data) => {
      this.users = data;
    });

  }


  filterUsers() {
    
    const email = this.searchInput.nativeElement.value;
    const lowerCaseSearch = email.toLowerCase();
    console.log("Eingegebene Email: " + lowerCaseSearch);
    
    if (!lowerCaseSearch) {
      this.loadUsers()
    } else {
      this.users = this.users.filter(user => {
        const lowerCaseEmail = user.email.toLowerCase();
        return lowerCaseEmail.includes(lowerCaseSearch);
        
      });
    }
  }

  userLoeschen(user_id: number): void {
    console.log("User wird gelöscht");
    this.nutzerService.loeschen(user_id).subscribe(() => {
      this.loadUsers();
    });
  }

  navigateToAdminBearbeiten(email: string, id: number): void {
    console.log(id);
    this.router.navigate(['/admin-bearbeiten', email, id]);
}
}
