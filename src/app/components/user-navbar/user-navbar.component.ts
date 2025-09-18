import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-user-navbar',
    imports: [
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css'
})
export class UserNavbarComponent {
  constructor(private readonly login:AuthService) { }

  userLinks = [
    { name: 'Home', url: '/', icon: 'bi-house', exact: true },
    { name: 'Addictions', url: '/my-addictions', icon: 'bi-heart-pulse', exact: false },
    { name: 'Articles', url: '/articles', icon: 'bi-book', exact: false },
    { name: 'Checkin', url: '/checkin', icon: 'bi-calendar-check-fill', exact: false },
    { name: 'Contact', url: '/contact', icon: 'bi-envelope', exact: false },
  ];

}
