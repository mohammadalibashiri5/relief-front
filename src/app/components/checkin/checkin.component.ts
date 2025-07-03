import {Component, OnInit} from '@angular/core';
import {CheckinService} from '../../services/checkin.service';
import {NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IUserResponse} from '../../models/ResponseModel/userResponse';
import {AddictionService} from '../../services/addiction.service';
import {CheckInResponse} from '../../models/ResponseModel/CheckInResponse';
import {StreakLevel} from '../../models/enum/StreakLevel';
import {CalendarOptions} from '@fullcalendar/core';
import {FullCalendarModule} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-checkin',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    FullCalendarModule,
  ],
  templateUrl: './checkin.component.html',
  styleUrl: './checkin.component.css',
})
export class CheckinComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    events: [
      {title: 'event 1', date: '2019-04-01'},
      {title: 'event 2', date: '2019-04-02'}
    ]
  };

  handleDateClick(arg: DateClickArg) {
    alert('date click! ' + arg.dateStr)
  }
  checkinForm!: FormGroup;
  user!:IUserResponse;
  addictions!:any;
  username = '';
  addictionName = '';
  isClean = true;
  message = '';
  checkInStatus:CheckInResponse;

  constructor(private checkInService: CheckinService,
              private loginService: AuthService,
              private fb: FormBuilder,
              private addictionService: AddictionService) {
    this.loginService.getUser().subscribe({
      next: data => {
        this.username = data.username;
      }
      });

    this.checkinForm = this.fb.group({
      addiction: ['', Validators.required],
      checkinStatus: ['', Validators.required]
    });

    this.addictionService.fetchAddictions().subscribe({
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
