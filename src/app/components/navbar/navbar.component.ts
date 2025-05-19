import {Component} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {UserService} from '../../services/user.service';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  {

  constructor(private userService: UserService) {

  }


  isNotLoggedIn(): boolean {
    return !sessionStorage.getItem('token');
  }

  links = [
    { name: 'Home', url: '/', icon: 'bi-house', exact: true },
    { name: 'Addictions', url: '/my-addictions', icon: 'bi-heart-pulse', exact: false },
    { name: 'Progress', url: '/progress', icon: 'bi-graph-up', exact: false },
    { name: 'Resources', url: '/resources', icon: 'bi-book', exact: false },
    { name: 'Community', url: '/community', icon: 'bi-people', exact: false }
  ];


  logout() {
    this.userService.logout();
  }
}
