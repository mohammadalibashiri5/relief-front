import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AddictionManagerComponent} from '../addiction-manager/addiction-manager.component';

@Component({
  selector: 'app-addiction',
  imports: [
    ReactiveFormsModule,
    AddictionManagerComponent
  ],
  templateUrl: './addiction.component.html',
  styleUrl: './addiction.component.css'
})
export class AddictionComponent {

 /* severityLevels = Object.values(SeverityLevel);
  addictionForm!: FormGroup;
  addictions: AddictionResponse[] = [];
  private destroy$ = new Subject<void>();
  showModal: boolean = false;
  isEditMode: boolean = false;
  modalTitle: string = 'Add New Addiction';
  currentAddictionId: number | null = null;

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
  openAddModal(): void {
    this.isEditMode = false;
    this.modalTitle = 'Add New Addiction';
    this.addictionForm.reset();
    this.showModal = true;
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
        this.toastr.error('Failed to create addiction');
        console.error(err);
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
        this.initializeAddictions();
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
  }*/
}
