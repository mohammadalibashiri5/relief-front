import {Component} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  imports: [
    NgIf,
    NgForOf
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

  links: { name: string; url: string }[] = [
    { name: 'Home', url: '/' },
    { name: 'Addictions', url: '/my-addictions' },
    { name: 'Motivation', url: '/motivation' },
    { name: 'Checkin', url: '/checkin' },
  ];


}
