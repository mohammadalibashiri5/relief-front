import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { AddictionDetailComponent } from '../addiction-detail/addiction-detail.component';

import { AddictionService } from '../../services/addiction.service';
import { CategoryTypeService } from '../../services/category-type.service';
import { ToastrService } from 'ngx-toastr';

import { SeverityLevel } from '../../models/enum/SeverityLevel';
import { AddictionRequest } from '../../models/RequestModel/addictionRequest';
import { AddictionResponse } from '../../models/ResponseModel/addictionResponse';
import { CategoryTypeResponse } from '../../models/ResponseModel/categoryTypeResponse';

import {NgSelectComponent, NgOptionTemplateDirective, NgLabelTemplateDirective} from '@ng-select/ng-select';
import {async, Observable, Subject, takeUntil} from 'rxjs';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-addiction-manager',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ModalComponent,
    AddictionDetailComponent,
    NgSelectComponent,
    NgOptionTemplateDirective,
    NgLabelTemplateDirective,
    AsyncPipe,
    NgOptimizedImage
  ],
  templateUrl: './addiction-manager.component.html',
  styleUrl: './addiction-manager.component.css'
})
export class AddictionManagerComponent implements OnInit, OnDestroy {

  loading$:Observable<boolean>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly addictionService: AddictionService,
    private readonly categoryService: CategoryTypeService,
    private readonly toastr: ToastrService
  ) {
    this.initializeForm();
    this.loading$ = this.addictionService.loading$;

  }

  addictionForm!: FormGroup;
  severityLevels: SeverityLevel[] = Object.values(SeverityLevel);

  @ViewChild(AddictionDetailComponent) addictionDetail!: AddictionDetailComponent;



  // Local component state
  filteredAddictions: AddictionResponse[] = [];
  categories: CategoryTypeResponse[] = [];
  availableAddictions: AddictionResponse[] = []; // For dropdown

  isEditMode = false;
  editingAddictionId: number | null = null;
  modalTitle = 'Add New Addiction';
  showModal = false;
  isSubmitted = false;

  private readonly destroy$ = new Subject<void>();


  // Observables from service

  ngOnInit(): void {
    this.loadCategories();
    this.setupFormListeners();

    // Subscribe to addictions from service (already fetched in service constructor)
    this.addictionService.addictions$.pipe(takeUntil(this.destroy$)).subscribe({});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.addictionForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      addictionName: ['', Validators.required],
      severityLevel: [null, Validators.required],
      yearsOfAddiction: [null, [Validators.required, Validators.min(0)]]
    });
  }

  private setupFormListeners(): void {
    this.addictionForm.get('categoryName')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(categoryName => {
        if (categoryName) {
          this.loadAvailableAddictions(categoryName);
          this.addictionForm.get('addictionName')?.reset();
        }
      });
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.editingAddictionId = null;
    this.modalTitle = 'Add New Addiction';
    this.addictionForm.reset();
    this.isSubmitted = false;
    this.showModal = true;
  }

  openEditModal(addiction: AddictionResponse): void {
    this.isEditMode = true;
    this.editingAddictionId = addiction.id;
    this.modalTitle = 'Edit Addiction';

    // Populate form with existing values
    this.addictionForm.patchValue({
      categoryName: addiction.categoryType,
      addictionName: addiction.addictionName,
      severityLevel: addiction.severityLevel,
      yearsOfAddiction: addiction.yearsOfAddiction
    });

    this.isSubmitted = false;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.addictionForm.reset();
    this.isSubmitted = false;
    this.editingAddictionId = null;
  }

  onCategoryChange(): void {
    const selectedCategory = this.addictionForm.get('categoryName')?.value;
    if (selectedCategory) {
      this.filteredAddictions = this.availableAddictions.filter(
        a => a.categoryType === selectedCategory
      );
    }
  }

  createAddiction(): void {
    this.isSubmitted = true;

    if (this.addictionForm.invalid) {
      this.markFormGroupTouched(this.addictionForm);
      this.toastr.warning('Please fill all required fields');
      return;
    }

    const addiction: AddictionRequest = this.addictionForm.value;
    const addictionName = this.addictionForm.get('addictionName')?.value;

    this.addictionService.addAddiction(addiction, addictionName)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.closeModal();
          // No need to manually refresh - BehaviorSubject handles it
        },
        error: (err) => {
          if (err.status === 400) {
            this.toastr.error('Addiction already exists');
          }
          // Error toast already handled in service
        }
      });
  }

  updateAddiction(): void {
    this.isSubmitted = true;

    if (this.addictionForm.invalid) {
      this.markFormGroupTouched(this.addictionForm);
      this.toastr.warning('Please fill all required fields');
      return;
    }

    if (!this.editingAddictionId) {
      this.toastr.error('No addiction selected for editing');
      return;
    }

    const addiction: AddictionRequest = this.addictionForm.value;

    this.addictionService.updateAddiction(this.editingAddictionId, addiction)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.closeModal();
          // No need to manually refresh - BehaviorSubject handles it
        },
        error: (err) => {
          // Error already handled in service
          console.error('Update error:', err);
        }
      });
  }

  deleteAddiction(id: number): void {
    if (!confirm('Are you sure you want to delete this addiction?')) {
      return;
    }

    this.addictionService.deleteAddiction(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          // Success toast handled in service
          // List automatically updates via BehaviorSubject
        },
        error: (err) => {
          // Error toast handled in service
          console.error('Delete error:', err);
        }
      });
  }

  private loadCategories(): void {
    this.categoryService.getCategoryTypes()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.categories = data;
        },
        error: (err) => {
          console.error('Error loading categories', err);
          this.toastr.error('Failed to load categories');
        }
      });
  }

  private loadAvailableAddictions(categoryName: string): void {
    this.addictionService.getAddictionByCategoryType(categoryName)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: AddictionResponse[]) => {
          this.availableAddictions = data;
          this.filteredAddictions = data;
        },
        error: (err) => {
          console.error('Error loading addictions for category', err);
        }
      });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onEditAddiction(addiction: AddictionResponse): void {
    this.openEditModal(addiction);
  }
}
