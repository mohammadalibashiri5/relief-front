import {Component, Input} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {IUser} from './models/RequestModel/userModel';
import {AdminNavbarComponent} from './components/admin-navbar/admin-navbar.component';
import {NgIf} from '@angular/common';
import {UserService} from './services/user.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, AdminNavbarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  role: string | null = null;
  constructor(private userService: UserService) {
    this.userService.getUser().subscribe(user => {
      this.role = user?.role || null;
    });
  }
}
