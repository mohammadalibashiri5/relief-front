import {Component, OnInit} from '@angular/core';
import {HomeComponent} from '../home/home.component';
import {FooterComponent} from '../footer/footer.component';
import {NgForOf, NgIf} from '@angular/common';
import {RegisterService} from '../../services/register.service';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  username: string = 'Guest'; // Default username

  constructor(private userService: LoginService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((data) => {
      this.username = data.name;
    });
  }
  isNotLoggedIn(): boolean {
    return !sessionStorage.getItem('token');
  }

  links: { name: string; url: string }[] = [
    { name: 'Home', url: '/' },
    { name: 'Addictions', url: '/my-addictions' },
    { name: 'Experiences', url: '/experiences' },
    { name: 'Checkin', url: '/checkin' },
  ];


}
