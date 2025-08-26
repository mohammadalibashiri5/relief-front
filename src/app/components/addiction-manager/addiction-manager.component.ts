import { Component, OnInit, ViewChild } from '@angular/core';
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
    NgLabelTemplateDirective
  ],
  templateUrl: './addiction-manager.component.html',
  styleUrl: './addiction-manager.component.css'
})
export class AddictionManagerComponent implements OnInit {
  addictionForm!: FormGroup;
  severityLevels: SeverityLevel[] = Object.values(SeverityLevel);

  @ViewChild(AddictionDetailComponent) addictionList!: AddictionDetailComponent;

  addictions: AddictionResponse[] = [];
  filteredAddictions: AddictionResponse[] = [];
  categories: CategoryTypeResponse[] = [];

  isEditMode = false;
  modalTitle = 'Add New Addiction';
  showModal = false;
  isLoading = false;
  isSubmitted = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly addictionService: AddictionService,
    private readonly categoryService: CategoryTypeService,
    private readonly toastr: ToastrService
  ) {
    this.addictionForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      addictionName: ['', Validators.required],
      severityLevel: [null, Validators.required],
      yearsOfAddiction: [null, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadCategories();

    this.addictionForm.get('categoryName')?.valueChanges.subscribe(categoryName => {
      if (categoryName) {
        this.loadAddictions(categoryName);
        this.addictionForm.get('addictionName')?.reset();
      }
    });
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.modalTitle = 'Add New Addiction';
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.addictionForm.reset();
  }

  onCategoryChange(): void {
    const selectedCategory = this.addictionForm.get('categoryName')?.value;
    this.filteredAddictions = this.addictions.filter(a => a.categoryType === selectedCategory);
    this.addictionForm.patchValue({ addictionName: null });
  }

  createAddiction(): void {
    this.isSubmitted = true;

    if (this.addictionForm.invalid) {
      this.toastr.warning('Please fill all required fields');
      return;
    }

    const addiction: AddictionRequest = this.addictionForm.value;
    const addictionName = this.addictionForm.get('addictionName')?.value;

    this.addictionService.addAddiction(addiction, addictionName).subscribe({
      next: () => {
        this.toastr.success('Addiction created successfully');
        this.closeModal();
      },
      error: (err) => {
        console.log(addictionName);
        if (err.status === 400) {
          this.toastr.error('Addiction already exists');
        } else {
          this.toastr.error('Failed to create addiction');
        }
      }
    });
  }

  updateAddiction(): void {
    this.isSubmitted = true;

    if (this.addictionForm.invalid || !this.addictionForm.invalid) {
      this.toastr.warning('Please fill all required fields');
      return;
    }

    const addiction: AddictionRequest = this.addictionForm.value;

    this.addictionService.updateAddiction(0, addiction).subscribe({
      next: () => {
        this.toastr.success('Addiction updated successfully');
        this.closeModal();
      },
      error: (err) => {
        this.toastr.error('Failed to update addiction');
        console.error(err);
      }
    });
  }

  deleteAddiction(id: number): void {
    if (!confirm('Are you sure you want to delete this addiction?')) {
      return;
    }

    this.addictionService.deleteAddiction(id).subscribe({
      next: () => {
        this.toastr.success('Addiction deleted successfully');
      },
      error: (err) => {
        this.toastr.error('Failed to delete addiction');
        console.error(err);
      }
    });
  }

  private loadCategories(): void {
    this.isLoading = true;

    this.categoryService.getCategoryTypes().subscribe({
      next: (data) => {
        this.categories = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading categories', err);
        this.isLoading = false;
      }
    });
  }

  private loadAddictions(categoryName: string): void {
    this.isLoading = true;

    this.addictionService.getAddictionByCategoryType(categoryName).subscribe({
      next: (data: AddictionResponse[]) => {
        this.addictions = data;
        this.filteredAddictions = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading addictions', err);
        this.isLoading = false;
      }
    });
  }
}
