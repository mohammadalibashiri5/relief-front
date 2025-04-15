import { Component } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../../models/RequestModel/userModel';
import {NgIf} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    FormsModule,
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  passwordFieldType: string = 'password'; // Initial type for the password field
  passwordIconClass: string = 'bi bi-eye-slash'; // Initial icon class



  constructor(
    private userService: RegisterService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private toastr:ToastrService
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      familyName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
          Validators.pattern('^[A-Z][A-Za-z\\d@$!%*?&]{7,15}$'),
        ],
      ],
      dateOfBirth: ['', Validators.required], // Simplified for date
    });
  }

  // Getter methods
  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get name() {
    return this.registerForm.controls['name'];
  }

  get familyName() {
    return this.registerForm.controls['familyName'];
  }

  public get username() {
    return this.registerForm.controls['username'];
  }

  get dateOfBirth() {
    return this.registerForm.controls['dateOfBirth'];
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    this.passwordIconClass = this.passwordIconClass === 'bi bi-eye-slash' ? 'bi bi-eye' : 'bi bi-eye-slash';
  }


  addUser() {
    const user: IUser = {
      name: this.registerForm.value.name!,
      familyName: this.registerForm.value.familyName!,
      username: this.registerForm.value.username!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
      dateOfBirth: new Date(this.registerForm.value.dateOfBirth),
    };

    this.userService.addUser(user).subscribe({
      next: (user) => {
      },
      error: (err) => {
        if (err.status === 409 || err.status === 400) {
          this.toastr.error('Email already exists!');
        } else {
          this.toastr.error('Something went wrong. Please try again.');
        }
      },
      complete: () => {
        this.router.navigate(['/login']).then(() => {
          this.toastr.success('Registration successful! Please log in.');
        });
      },
    });
  }
}
