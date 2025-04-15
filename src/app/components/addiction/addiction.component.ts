import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AddictionService} from '../../services/addiction.service';
import {SeverityLevel} from '../../models/enum/SeverityLevel';
import {NgForOf, NgIf} from '@angular/common';
import {AddictionResponse} from '../../models/ResponseModel/addictionResponse';
import {Subject, takeUntil} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-addiction',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './addiction.component.html',
  styleUrl: './addiction.component.css'
})
export class AddictionComponent implements OnInit {

  showModal: boolean = false;
  severityLevels = Object.values(SeverityLevel);
  addictionForm!: FormGroup;
  addictions: AddictionResponse[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private addictionService: AddictionService,
    private toastr: ToastrService // Recommended for user feedback
  ) {
    this.addictionForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      severityLevel: [null, Validators.required],
      yearOfAddiction: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.initializeAddictions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeAddictions(): void {
    // First load the initial data
    this.addictionService.fetchAddictions().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        // After fetch is successful, subscribe to the addictions
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

  createAddiction(): void {
    if (this.addictionForm.invalid) {
      this.toastr.warning('Please fill all required fields');
      return;
    }

    const addiction = this.addictionForm.value;
    this.addictionService.addAddiction(addiction).subscribe({
      next: () => {
        this.toastr.success('Addiction created successfully');
        this.addictionForm.reset();
        const closeButton = document.querySelector('.btn-close') as HTMLElement // Better to use a proper modal service
        closeButton?.click();
      },
      error: (err) => {
        this.toastr.error('Failed to create addiction');
        console.error(err);
      }
    });
  }

  deleteAddiction(name: string): void {
    if (!confirm('Are you sure you want to delete this addiction?')) {
      return;
    }

    this.addictionService.deleteAddiction(name).subscribe({
      next: () => {
        this.toastr.success('Addiction deleted successfully');
      },
      error: (err) => {
        this.toastr.error('Failed to delete addiction');
        console.error(err);
      }
    });
  }
}
