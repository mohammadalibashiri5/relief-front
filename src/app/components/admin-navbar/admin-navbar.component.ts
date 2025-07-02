import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {UserService} from '../../services/user.service';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-admin-navbar',
    imports: [
        NgForOf,
        NgIf,
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {
  constructor(private userService: UserService, private login:LoginService) {

  }


  isAuthenticated(): boolean {
    return this.login.isAuthenticated() && this.login.hasRole('ROLE_ADMIN');
  }

  links = [
    { name: 'Home', url: '/', icon: 'bi-house', exact: true },
    { name: 'Articles', url: '/articles', icon: 'bi-book', exact: false },
  ];


  logout() {
    this.login.logout();
  }
}
