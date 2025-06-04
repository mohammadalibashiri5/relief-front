import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {AddictionResponse} from "../../models/ResponseModel/addictionResponse";
import {AddictionService} from "../../services/addiction.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-addiction-detail',
  imports: [
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './addiction-detail.component.html',
  styleUrl: './addiction-detail.component.css'
})
export class AddictionDetailComponent implements OnInit {

  @Input() addictions: AddictionResponse[] | null = [];
  @Output() edit = new EventEmitter<AddictionResponse>();
  @Output() delete = new EventEmitter<string>();

  constructor(private addictionService: AddictionService, private toastr: ToastrService, private router: Router) {
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



  goToTriggers(addictionId: number, addictionName:string ): void {
    this.router.navigate(['/triggers'], {
      queryParams: {
        addictionId,
        addictionName
      }
    }).then();
  }

}
