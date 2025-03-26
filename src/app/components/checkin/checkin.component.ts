import {Component} from '@angular/core';
import {CheckinService} from '../../services/checkin.service';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-checkin',
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './checkin.component.html',
  styleUrl: './checkin.component.css',
})
export class CheckinComponent {

  username = 'testUser'; // Replace with actual username (could be from authentication)
  addictionName = 'Smoking'; // Replace with user-selected addiction
  isClean = true;
  message = '';

  constructor(private checkInService: CheckinService) {}

  submitCheckIn() {
    this.checkInService.performCheckin(this.username, this.addictionName, this.isClean).subscribe({
      next: (response) => {
        this.message = `Check-in successful! Current Streak: ${response.currentStreak}, Level: ${response.level}`;
      },
      error: (err) => {
        this.message = err.error?.message || 'Check-in failed!';
      }
    });
  }
}
