import {Component} from '@angular/core';
import {RegisterService} from '../../services/register.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {IUser} from '../../models/RequestModel/userModel';
import {ToastrService} from 'ngx-toastr';
import {ageRangeValidator} from '../../validators/minAgeValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  passwordFieldType: string = 'password';
  passwordIconClass: string = 'bi bi-eye-slash';
  isSubmitting: boolean = false;

  constructor(
    private userService: RegisterService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
        ]
      ],
      familyName: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
        ]
      ],
      username: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z0-9_]+$')
        ]
      ],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
          Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,16}$'),
        ],
      ],
      dateOfBirth: ['', [
        Validators.required,
        ageRangeValidator(13, 120)
        ]
      ],
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (!control || !control.errors) return '';

    const errors = control.errors;
    const fieldName = this.getFieldLabel(controlName);

    if (errors['required']) return `${fieldName} is required`;
    if (errors['email']) return 'Please enter a valid email';
    if (errors['minlength']) {
      return `Minimum ${errors['minlength'].requiredLength} characters`;
    }
    if (errors['maxlength']) {
      return `Maximum ${errors['maxlength'].requiredLength} characters`;
    }
    if (errors['pattern']) {
      if (controlName === 'password') {
        return 'Password must contain uppercase, number, and special character';
      }
      if (controlName === 'username') {
        return 'Only letters, numbers, and underscores allowed';
      }
    }
    if (errors['ageRestriction']) return 'Must be 13+ years old';

    return 'Invalid input';
  }

  private getFieldLabel(controlName: string): string {
    const labels: { [key: string]: string } = {
      name: 'First name',
      familyName: 'Last name',
      email: 'Email',
      password: 'Password',
      username: 'Username',
      dateOfBirth: 'Birth date'
    };
    return labels[controlName] || 'Field';
  }

  shouldShowError(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
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

  get username() {
    return this.registerForm.controls['username'];
  }

  get dateOfBirth() {
    return this.registerForm.controls['dateOfBirth'];
  }

  /** * Calculate the maximum birthdate to ensure the user is at least 13 years old.
   * This sets the max date to today's date minus 13 years.
   * but the main validation is done in the ageRangeValidator function.
   */

  maxBirthDate = new Date(new Date()
    .setFullYear(new Date().getFullYear() - 13))
    .toISOString().split('T')[0];


  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    this.passwordIconClass =
      this.passwordIconClass === 'bi bi-eye-slash'
        ? 'bi bi-eye'
        : 'bi bi-eye-slash';
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
      next: () => {},
      error: (err) => {
        if (
          err.status === 409 ||
          (err.status === 400 && err.message('')) ||
          err.status === 403
        ) {
          this.toastr.error('Email or username already exist!');
        }
        if (err.status === 406 ) {
          this.toastr.error('Invalid data provided. Please check your inputs.');
        } else
        {
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
