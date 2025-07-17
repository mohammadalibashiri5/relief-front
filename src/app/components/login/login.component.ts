import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {IUser} from '../../models/RequestModel/userModel';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  passwordFieldType: string = 'password';
  passwordIconClass: string = 'bi bi-eye-slash';
  loginForm: FormGroup;
  user!: IUser;

  constructor(private readonly fb: FormBuilder, private readonly auth: AuthService, private readonly router: Router, private readonly toastr: ToastrService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }


  loginUser() {
    let email = this.loginForm.value?.email!;
    let password = this.loginForm.value?.password!;

    this.auth.loginUser(email, password).subscribe({
      next: () => {
        const user = this.auth.getCurrentUser();
        if (user?.roles?.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin/dashboard']).then(() => {
            this.toastr.success('Welcome to the admin dashboard!');
          });
        } else {
          this.router.navigate(['/dashboard']).then(() => {
            this.toastr.success('Welcome Back !',);
          });
        }
      },
      error: (err) => {
        if (err.status === 403) {
          this.toastr.error('Wrong Email or Password');
        }
      }
    });

  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    this.passwordIconClass = this.passwordIconClass === 'bi bi-eye-slash' ? 'bi bi-eye' : 'bi bi-eye-slash';
  }

}
