import {Component, OnInit} from '@angular/core';
import {CheckinService} from '../../services/checkin.service';
import {CheckInResponse} from '../../models/ResponseModel/CheckInResponse';
import {NgIf} from '@angular/common';
import {Checkin} from '../../models/checkin';

@Component({
  selector: 'app-checkin',
  imports: [
    NgIf
  ],
  templateUrl: './checkin.component.html',
  styleUrl: './checkin.component.css',
})
export class CheckinComponent implements OnInit {

  checkin: Checkin;

  constructor(private checkinService: CheckinService) {
    this.checkin = new Checkin();
  }

  ngOnInit(): void {
    const storedCheckin = sessionStorage.getItem("latestCheckin");

    if (storedCheckin) {
      this.checkin = JSON.parse(storedCheckin);
      if (this.checkin.date === new Date().toISOString().split('T')[0]) {
        return; // No need to re-fetch
      }
    }

    this.performCheckin();
  }


  performCheckin() {
    this.checkinService.performCheckin(this.checkin).subscribe({
      next: (r) => {
        if (r) {
          this.checkin = r; // Ensure r is valid before assignment
          sessionStorage.setItem("latestCheckin", JSON.stringify(r));
        } else {
          alert('Empty response from server');
        }
      },
      error: (err) => {
        alert('Error performing checkin');
        console.log(err);
      }
    });
  }
}
