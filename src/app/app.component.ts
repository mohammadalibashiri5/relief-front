import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {AdminNavbarComponent} from './components/admin-navbar/admin-navbar.component';
import {LoginService} from './services/login.service';
import {HasRoleDirective} from './has-role.directive';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, AdminNavbarComponent, HasRoleDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isAdmin: boolean = false;

  constructor(private auth: LoginService) {
    this.updateAdminStatus();
    // Listen for auth changes if your app needs it
  }

  private updateAdminStatus(): void {
    this.isAdmin = this.auth.hasRole('ROLE_ADMIN');
  }


}
