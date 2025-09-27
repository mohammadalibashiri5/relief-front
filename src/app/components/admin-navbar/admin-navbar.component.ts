import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {
  adminLinks = [
    { name: 'Articles', url: '/articles', icon: 'bi-book', exact: false },
  ];

}
