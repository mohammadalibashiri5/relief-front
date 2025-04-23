import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {AddictionResponse} from "../../models/ResponseModel/addictionResponse";
import {AddictionService} from "../../services/addiction.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Subject, takeUntil} from 'rxjs';
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
export class AddictionDetailComponent implements OnInit, OnDestroy {

  @Input() addictions: AddictionResponse[] = [];
  @Output() edit = new EventEmitter<AddictionResponse>();
  @Output() delete = new EventEmitter<string>();

  private destroy$ = new Subject<void>();
  constructor(private addictionService: AddictionService, private toastr: ToastrService, private router: Router) {}

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
      error: () => {
        this.toastr.error('Failed to load addictions');
      }
    });
  }



  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goToTriggers(addictionName: string) {
    this.router.navigate(['/triggers'], {
      queryParams: { addictionName: addictionName }
    }).then(() => {});
  }
}
