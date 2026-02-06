import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ModalComponent} from '../modal/modal.component';
import {AddictionDetailComponent} from '../addiction-detail/addiction-detail.component';

import {AddictionService} from '../../services/addiction.service';
import {CategoryTypeService} from '../../services/category-type.service';
import {ToastrService} from 'ngx-toastr';

import {SeverityLevel} from '../../models/enum/SeverityLevel';
import {AddictionRequest} from '../../models/RequestModel/addictionRequest';
import {AddictionResponse} from '../../models/ResponseModel/addictionResponse';
import {CategoryTypeResponse} from '../../models/ResponseModel/categoryTypeResponse';

import {NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent} from '@ng-select/ng-select';
import {NgOptimizedImage} from '@angular/common';

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
    NgOptimizedImage
  ],
  templateUrl: './addiction-manager.component.html',
  styleUrl: './addiction-manager.component.css'
})
export class AddictionManagerComponent implements OnInit {

  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly addictionService: AddictionService = inject(AddictionService);
  private readonly categoryService: CategoryTypeService = inject(CategoryTypeService);
  private readonly toastr: ToastrService = inject(ToastrService);

  loading = this.addictionService.loading;

  addictionForm!: FormGroup;
  severityLevels: SeverityLevel[] = Object.values(SeverityLevel);

  @ViewChild(AddictionDetailComponent) addictionDetail!: AddictionDetailComponent;

  filteredAddictions: AddictionResponse[] = [];
  categories: CategoryTypeResponse[] = [];
  availableAddictions: AddictionResponse[] = [];

  isEditMode = false;
  editingAddictionId: number | null = null;
  modalTitle = 'Add New Addiction';
  showModal = false;
  isSubmitted = false;



  ngOnInit(): void {
    this.initializeForm();
    this.loadCategories();
    this.setupFormListeners();
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
      .pipe()
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
      .pipe()
      .subscribe({
        next: () => {
          this.closeModal()
        },
        error: (err) => {
          if (err.status === 400) {
            this.toastr.error('Addiction already exists');
          }
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
      .pipe()
      .subscribe({
        next: () => {
          this.closeModal();
        },
        error: (err) => {
          console.error('Update error:', err);
        }
      });
  }

  deleteAddiction(id: number): void {
    if (!confirm('Are you sure you want to delete this addiction?')) {
      return;
    }

    this.addictionService.deleteAddiction(id)
      .pipe()
      .subscribe({
        next: () => {},
        error: () => {}
      });
  }

  private loadCategories(): void {
    this.categoryService.getCategoryTypes()
      .pipe()
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
      .pipe()
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
