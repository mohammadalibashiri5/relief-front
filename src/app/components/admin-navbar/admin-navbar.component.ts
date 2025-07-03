import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  imports: [
    NgIf,
    RouterLink,
    NgForOf,
    RouterLinkActive
  ],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {
  isAdmin: boolean = false;
  constructor(private auth: AuthService) {
    this.isAdmin = auth.hasRole('ROLE_ADMIN');
  }

  adminLinks = [
    { name: 'Admin Dashboard', url: '/admin', icon: 'bi-shield-lock', exact: false },
    { name: 'User Management', url: '/admin/users', icon: 'bi-people-fill', exact: false }
  ];

  logout() {
    this.auth.logout();
  }
}
