import {Component, OnInit} from '@angular/core';
import {IUserResponse} from '../../models/ResponseModel/userResponse';
import {Router} from '@angular/router';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  imports: [
    NgForOf,
    NgIf,
    DatePipe,
    NgClass
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  user: IUserResponse | null = null;

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.userService.fetchUser().subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
        }
      },
      error: (err) => {
        if (err.status === 403) {
          this.router.navigate(['/login']).then(() => {
            this.toastr.warning('You are not authorized to view this page.');
          });
        }
      }
    });
  }

  logout() {
    this.userService.logout();
  }

  deleteAccount() {

  }

  emergencyCall() {

  }
}
