import {Component, OnInit} from '@angular/core';
import {IUserResponse} from '../../models/ResponseModel/userResponse';
import {UserService} from '../../services/user.service';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-user-detail',
  imports: [],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
  user!: IUserResponse;

  constructor(private userService: UserService, private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.loginService.getUser().subscribe({
      next: (value) => {
        this.user = value;
        this.userService.setUser(value);
      },
      error: (err) => {
        if (err.status === 403) {
          alert("You'd better trying log in");
          this.router.navigate(['login']).then(() => sessionStorage.clear());
        }
      }
    });
  }

  logout() {
    this.userService.clearUser(); // Clear user data on logout
    this.router.navigate(['login']).then(() => sessionStorage.clear());
  }
}

