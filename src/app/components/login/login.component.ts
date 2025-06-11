import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {IUser} from '../../models/RequestModel/userModel';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  passwordFieldType: string = 'password'; // Initial type for the password field
  passwordIconClass: string = 'bi bi-eye-slash'; // Initial icon class
  loginForm: FormGroup;
  user!: IUser;

  constructor(private fb:FormBuilder, private auth:LoginService, private router:Router, private userService:UserService, private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }


  loginUser() {
    let email = this.loginForm.value?.email!;
    let password = this.loginForm.value?.password!;

    this.auth.loginUser(email, password).subscribe({
      next: token => {
        sessionStorage.setItem('token', token.token);
        this.userService.fetchUser().subscribe(() => {
          this.router.navigate(['/dashboard']).then(() => this.toastr.success('Login successful!'));
        })
      },
      error: (err) => {
        if ([401, 403, 404].includes(err.status)) {
          alert('Wrong Email or Password');
        }
      }
    });

  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    this.passwordIconClass = this.passwordIconClass === 'bi bi-eye-slash' ? 'bi bi-eye' : 'bi bi-eye-slash';
  }

}
