import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-user-navbar',
    imports: [
        NgForOf,
        NgIf,
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css'
})
export class UserNavbarComponent {
  constructor(private login:AuthService) { }

  userLinks = [
    { name: 'Addictions', url: '/my-addictions', icon: 'bi-heart-pulse', exact: false },
    { name: 'Checkin', url: '/checkin', icon: 'bi-calendar-check-fill', exact: false }
  ];

  logout() {
    this.login.logout();
  }

}
