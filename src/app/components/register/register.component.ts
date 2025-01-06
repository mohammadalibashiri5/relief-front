import {Component} from '@angular/core';
import {RegisterService} from '../../services/register.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {IUser} from '../../models/user.model';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private userService: RegisterService, private readonly fb: FormBuilder, private readonly router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      familyName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
          Validators.pattern("^[A-Z][A-Za-z\\d@$!%*?&]{7,15}$")
        ]
      ],
      dateOfBirth:['',Validators.required]
    });
  }

  users:IUser[]=[];


  addUser() {
    let user:IUser = {
      name:this.registerForm.value.name!,
      familyName:this.registerForm.value.familyName!,
      username:this.registerForm.value.username!,
      email:this.registerForm.value.email!,
      password:this.registerForm.value.password!,
      dateOfBirth:new Date(this.registerForm.value.dateOfBirth)
    }
    this.userService.addUser(user).subscribe({
      next:user => {
        this.users.push(user);
      },
      error:err => {
        if (err.status === 409 || err.status === 400) {
          alert('email existe déjà');
        }
      },
      complete:() => {
        this.router.navigate(["/"]).then(()=> {
          alert("Welcome "+user.name)
        })
      }
    })
  }
}
