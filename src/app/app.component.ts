import {Component, Input} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {IUser} from './models/RequestModel/userModel';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @Input() user: IUser;
  constructor() {
    this.user =  {
      name:"",
      familyName:"",
      username:"",
      email:"",
      password:"",
      dateOfBirth: new Date
    }
  }
}
