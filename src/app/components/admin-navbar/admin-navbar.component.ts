import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {UserService} from '../../services/user.service';

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
  constructor(private userService: UserService) {

  }


  isNotLoggedIn(): boolean {
    return !sessionStorage.getItem('token');
  }

  links = [
    { name: 'Home', url: '/', icon: 'bi-house', exact: true },
    { name: 'Articles', url: '/articles', icon: 'bi-book', exact: false },
  ];


  logout() {
    this.userService.logout();
  }
}
