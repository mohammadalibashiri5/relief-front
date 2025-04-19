import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AddictionResponse} from "../../models/ResponseModel/addictionResponse";
import {AddictionService} from "../../services/addiction.service";
import {NgForOf, NgIf} from "@angular/common";
import {Subject, takeUntil} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-addiction-detail',
  imports: [
    RouterLink,
    NgForOf,
    NgIf
  ],
  templateUrl: './addiction-detail.component.html',
  styleUrl: './addiction-detail.component.css'
})
export class AddictionDetailComponent implements OnInit, OnDestroy {

  @Input() addictions: AddictionResponse[] = [];

  private destroy$ = new Subject<void>();
  constructor(private addictionService: AddictionService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.initializeAddictions();
  }


  private initializeAddictions(): void {
    this.addictionService.fetchAddictions().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.addictionService.getAddictions()
          .pipe(takeUntil(this.destroy$))
          .subscribe((addictions) => {
            this.addictions = addictions;
          });
      },
      error: (err) => {
        this.toastr.error('Failed to load addictions');
        console.error(err);
      }
    });
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
