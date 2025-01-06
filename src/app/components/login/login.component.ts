import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {IUser} from '../../models/user.model';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  user!: IUser;

  constructor(private fb:FormBuilder, private auth:LoginService, private router:Router) {
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
        sessionStorage.setItem('token', token.token)

      },
      error: (err) => {
        if (err.status == 404 || err.status == 401 || err.status == 403) {
          alert('Wrong Email or Password');
        }
      },
      complete: () => {

        this.router.navigate(['/']).then(r => alert('Welcome ' + email));
      }

    })

  }

}
