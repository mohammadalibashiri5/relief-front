import {Component, OnInit} from '@angular/core';
import {CheckinService} from '../../services/checkin.service';
import {NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {IUserResponse} from '../../models/ResponseModel/userResponse';
import {AddictionService} from '../../services/addiction.service';


@Component({
  selector: 'app-checkin',
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './checkin.component.html',
  styleUrl: './checkin.component.css',
})
export class CheckinComponent implements OnInit {
  checkinForm!: FormGroup;
  user!:IUserResponse;
  addictions!:any;
  username = ''; // Replace with actual username (could be from authentication)
  addictionName = ''; // Replace with user-selected addiction
  isClean = true;
  message = '';

  constructor(private checkInService: CheckinService,
              private loginService: LoginService,
              private fb: FormBuilder,
              private addictionService: AddictionService) {
    this.loginService.getUser().subscribe({
      next: data => {
        this.username = data.username;
        console.log(this.user);
      }
      });

    this.checkinForm = this.fb.group({
      addiction: ['', Validators.required],
      checkinStatus: ['', Validators.required]
    });

    this.addictionService.getAddiction().subscribe({
      next: value => this.addictions = value
    });
  }


  submitCheckIn() {

  }

  registerCheckIn() {
    const formData = {
      username: this.username, // Get the connected user
      addiction: this.checkinForm.value.addiction, // Selected addiction
      checkinStatus: this.checkinForm.value.checkinStatus // True/False from radio
    };

    this.checkInService.performCheckin(formData.addiction, formData.checkinStatus).subscribe({
      next: (response) => {
      },
      error: (err) => {
        console.log(err);
        this.message = err.error?.message || 'Check-in failed!';
      }
    });
  }

  ngOnInit(): void {
  }
}
