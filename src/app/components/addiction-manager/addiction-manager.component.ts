import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ModalComponent} from "../modal/modal.component";
import {NgForOf, NgIf} from "@angular/common";
import {SeverityLevel} from '../../models/enum/SeverityLevel';
import {AddictionResponse} from '../../models/ResponseModel/addictionResponse';
import {AddictionService} from '../../services/addiction.service';
import {ToastrService} from 'ngx-toastr';
import {AddictionRequest} from '../../models/RequestModel/addictionRequest';
import {AddictionDetailComponent} from '../addiction-detail/addiction-detail.component';

@Component({
  selector: 'app-addiction-manager',
  imports: [
    FormsModule,
    ModalComponent,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    AddictionDetailComponent
  ],
  templateUrl: './addiction-manager.component.html',
  styleUrl: './addiction-manager.component.css'
})
export class AddictionManagerComponent {
  severityLevels:SeverityLevel[] = Object.values(SeverityLevel);
  addictionForm!: FormGroup;
  isEditMode: boolean = false;
  modalTitle: string = 'Add New Addiction';
  showModal: boolean = false;
  currentAddictionId: number | null = null;
  addictions!:AddictionResponse[];

  @ViewChild(AddictionDetailComponent) addictionList!: AddictionDetailComponent;

  refreshAddictions() {
    this.addictionService.fetchAddictions().subscribe({
      next: () => {
        this.addictionService.fetchAddictions().subscribe((addictions) => {
          this.addictions = addictions; // Update parent's list
        });
      },
      error: () => this.toastr.error('Failed to refresh addictions')
    });
  }

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

  openEditModal(addiction: AddictionResponse): void {
    this.isEditMode = true;
    this.modalTitle = 'Edit Addiction';
    this.currentAddictionId = addiction.id;

    this.addictionForm.patchValue({
      name: addiction.name,
      description: addiction.description,
      severityLevel: addiction.severityLevel,
      yearOfAddiction: addiction.yearOfAddiction
    });

    this.showModal = true;
  }


  closeModal(): void {
    this.showModal = false;
    this.addictionForm.reset();
    this.currentAddictionId = null;
  }


  createAddiction(): void {
    if (this.addictionForm.invalid) {
      this.toastr.warning('Please fill all required fields');
      return;
    }

    const addiction:AddictionRequest = this.addictionForm.value;
    this.addictionService.addAddiction(addiction).subscribe({
      next: () => {
        this.toastr.success('Addiction created successfully');
        const closeButton = document.querySelector('.btn-close') as HTMLElement // Better to use a proper modal service
        closeButton?.click();
        this.addictionForm.reset();
        this.showModal = false;
      },
      error: (err) => {
        if (err.status === 400) {
          this.toastr.error('Addiction already exists');
          return;
        }
        this.toastr.error('Failed to create addiction');
      }
    });
  }

  updateAddiction(): void {
    if (this.addictionForm.invalid || !this.currentAddictionId) {
      this.toastr.warning('Please fill all required fields');
      return;
    }

    const addiction: AddictionRequest = this.addictionForm.value;
    this.addictionService.updateAddiction(this.currentAddictionId, addiction).subscribe({
      next: () => {
        this.toastr.success('Addiction updated successfully');
        this.closeModal();
        this.refreshAddictions();
      },
      error: (err) => {
        this.toastr.error('Failed to update addiction');
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

  openAddModal() {
    this.showModal = true;
  }
}
