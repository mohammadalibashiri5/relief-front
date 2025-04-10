import {Component, OnInit} from '@angular/core';
import {CheckinService} from '../../services/checkin.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {IUserResponse} from '../../models/ResponseModel/userResponse';
import {AddictionService} from '../../services/addiction.service';
import {CheckInResponse} from '../../models/ResponseModel/CheckInResponse';
import {StreakLevel} from '../../models/enum/StreakLevel';


@Component({
  selector: 'app-checkin',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    DatePipe
  ],
  templateUrl: './checkin.component.html',
  styleUrl: './checkin.component.css',
})
export class CheckinComponent implements OnInit {
  checkinForm!: FormGroup;
  user!:IUserResponse;
  addictions!:any;
  username = '';
  addictionName = '';
  isClean = true;
  message = '';
  checkInStatus:CheckInResponse;

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
    this.checkInStatus = new class implements CheckInResponse {
      addictionName="";
      currentStreak=0;
      lastCheckinDat= new Date;
      level: StreakLevel= StreakLevel.NONE ;
      longestStreak: number = 0;
      startDate: Date = new Date() ;
      userName: string = "";
    }
  }

  registerCheckIn() {
    const formData = {
      username: this.username, // Get the connected user
      addiction: this.checkinForm.value.addiction, // Selected addiction
      checkinStatus: this.checkinForm.value.checkinStatus // True/False from radio
    };

    this.checkInService.performCheckin(formData.addiction, formData.checkinStatus).subscribe({
      next: (response) => {
        this.checkInStatus = response;
        console.log(this.checkInStatus);
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
