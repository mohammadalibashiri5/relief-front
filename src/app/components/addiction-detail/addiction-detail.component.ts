import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {AddictionResponse} from "../../models/ResponseModel/addictionResponse";
import {AddictionService} from "../../services/addiction.service";
import {ToastrService} from 'ngx-toastr';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-addiction-detail',
  imports: [
    NgClass,
  ],
  templateUrl: './addiction-detail.component.html',
  styleUrl: './addiction-detail.component.css'
})
export class AddictionDetailComponent implements OnInit {

  @Input() addictions: AddictionResponse[] | null = [];
  @Output() edit = new EventEmitter<AddictionResponse>();
  @Output() delete = new EventEmitter<number>();

  constructor(private readonly addictionService: AddictionService, private readonly toastr: ToastrService, private readonly router: Router) {
  }

  ngOnInit(): void {
    this.initializeAddictions();
  }


  private initializeAddictions(): void {
    this.addictionService.fetchAddictions().pipe().subscribe({
      next: (addictions) => {
        this.addictions = addictions;
      },
      error: () => {
        this.toastr.error('Failed to load addictions');
      }
    });
  }



  goToTriggers(addictionId: number ): void {
    this.router.navigate(['/triggers'], {
      queryParams: {
        addictionId,
      }
    }).then();
  }

}
