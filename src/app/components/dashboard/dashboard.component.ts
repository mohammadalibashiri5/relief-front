import {Component, OnInit} from '@angular/core';
import {IUserResponse} from '../../models/ResponseModel/userResponse';
import {Router} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  user!: IUserResponse;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    // Subscribe to the user observable to get the latest user data
    this.userService.getUser().subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
          console.log("USER in dashboard", user);
        }
        else return;
      },
      error: (err) => {
        console.error("Error fetching user data", err);
      }
    });
  }

  logout() {
    if (sessionStorage.getItem("token")) {
      this.router.navigate(['login']).then(() => sessionStorage.clear());
    }
  }

}
