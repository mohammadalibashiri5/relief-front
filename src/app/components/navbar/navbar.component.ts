import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AdminNavbarComponent} from '../admin-navbar/admin-navbar.component';
import {UserNavbarComponent} from '../user-navbar/user-navbar.component';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    AdminNavbarComponent,
    UserNavbarComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  {
   commonLinks = [
    { name: 'Home', url: '/', icon: 'bi-house', exact: true },
    { name: 'Articles', url: '/articles', icon: 'bi-book', exact: false },
  ];


  constructor(public authService: AuthService) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isAdmin(): boolean {
    return this.authService.hasRole('ROLE_ADMIN');
  }
  isUser(): boolean {
    return this.authService.hasRole('ROLE_VISITOR');
  }

  logout() {
    this.authService.logout();
  }
}
