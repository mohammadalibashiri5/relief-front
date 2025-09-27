import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {AddictionResponse} from "../../models/ResponseModel/addictionResponse";
import {AddictionService} from "../../services/addiction.service";
import {ToastrService} from 'ngx-toastr';
import {AsyncPipe, NgClass} from '@angular/common';
import {Observable, Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-addiction-detail',
  imports: [
    NgClass,
    AsyncPipe,
  ],
  templateUrl: './addiction-detail.component.html',
  styleUrl: './addiction-detail.component.css'
})
export class AddictionDetailComponent implements OnInit, OnDestroy {

  @Output() edit = new EventEmitter<AddictionResponse>();
  @Output() delete = new EventEmitter<number>();

  // Get addictions directly from service as Observable
  addictions$: Observable<AddictionResponse[]>;
  loading$: Observable<boolean>;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly addictionService: AddictionService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {
    // Subscribe to the service's observables
    this.addictions$ = this.addictionService.addictions$;
    this.loading$ = this.addictionService.loading$;
  }

  ngOnInit(): void {
    // The service already fetches addictions in its constructor
    // So we just need to subscribe if we need to do something with the data
    this.refreshAddictions();
    // Optional: Log changes for debugging
    this.addictions$
      .pipe(takeUntil(this.destroy$))
      .subscribe({});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onEdit(addiction: AddictionResponse): void {
    this.edit.emit(addiction);
  }

  onDelete(id: number): void {
    this.delete.emit(id);
  }

  goToTriggers(addictionId: number): void {
    this.router.navigate(['/triggers'], {
      queryParams: {
        addictionId,
      }
    }).then();
  }

  // Method to refresh data from server if needed
  refreshAddictions(): void {
    this.addictionService.refreshAddictions();
  }
}
