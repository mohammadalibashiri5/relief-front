import {Component, OnInit} from '@angular/core';
import {IUserResponse} from '../../models/ResponseModel/userResponse';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {AddictionService} from '../../services/addiction.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    DatePipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  user: IUserResponse | null = null;
  addictions: string = "";

  constructor(private userService: UserService,
              private router: Router,
              private toastr: ToastrService,
              private addictionService: AddictionService,
  ) {
  }

  ngOnInit(): void {
    this.addictionService.fetchAddictions().subscribe(res => {
      res.forEach(addiction => {
        this.addictions = addiction.addictionName
      })
    })
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
    if (!confirm('Are you sure you want to delete your account?')) {
      return;
    }
    this.userService.deleteUser().subscribe({
      next: () => {
        this.toastr.success('Your account has been deleted successfully.');
        this.router.navigate(['/login']).then(() => {
          this.toastr.warning('You have been logged out.');
        });
      },
      error: () => {
        this.toastr.error('Failed to delete account.');
      }
    })

  }

  emergencyCall() {

  }
}
