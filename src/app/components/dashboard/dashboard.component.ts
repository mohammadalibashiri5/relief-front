import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  imports: [
    DatePipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  user = this.userService.user;
  protected addictions: string = "";

  logout() {
    this.userService.logout();
    this.toastr.info('Logged out successfully');
  }

  deleteAccount() {
    if (!confirm('Are you sure?')) return;

    this.userService.deleteUser().subscribe({
      next: () => {
        this.toastr.success('Account deleted.');
        this.router.navigate(['/login']).then();
      },
      error: () => this.toastr.error('Delete failed.')
    });
  }
}
