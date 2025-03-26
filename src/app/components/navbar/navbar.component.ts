import {Component, Input, OnInit} from '@angular/core';
import {HomeComponent} from '../home/home.component';
import {FooterComponent} from '../footer/footer.component';
import {NgForOf, NgIf} from '@angular/common';
import {RegisterService} from '../../services/register.service';
import {LoginService} from '../../services/login.service';
import {UserService} from '../../services/user.service';
import {IUser} from '../../models/RequestModel/userModel';

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
  @Input() user: IUser;

  constructor(private userService: UserService) {
    this.user =  {
      name:"",
      familyName:"",
      username:"",
      email:"",
      password:"",
      dateOfBirth: new Date
    }

  }

  ngOnInit(): void {

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
