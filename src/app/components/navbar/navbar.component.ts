import { Component } from '@angular/core';
import {HomeComponent} from '../home/home.component';

@Component({
  selector: 'app-navbar',
  imports: [
    HomeComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
