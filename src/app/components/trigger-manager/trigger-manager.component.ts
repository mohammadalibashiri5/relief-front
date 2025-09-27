import {Component, OnDestroy, OnInit} from '@angular/core';
import {TriggerService} from '../../services/trigger.service';
import {TriggerResponse} from '../../models/ResponseModel/triggerResponse';
import {ToastrService} from 'ngx-toastr';
import {TriggerRequest} from '../../models/RequestModel/triggerRequest';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-trigger',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './trigger-manager.component.html',
  styleUrl: './trigger-manager.component.css'
})
export class TriggerManagerComponent implements OnInit, OnDestroy {
  triggers: TriggerResponse[] = [];
  triggerForm: FormGroup;
  addictionName!: string;
  addictionId!: number;
  isEditMode = false;
  currentTriggerId: number | null = null;

  private readonly destroy$:Subject<void> = new Subject<void>();

  editTrigger(trigger: TriggerResponse) {
    this.isEditMode = true;
    this.currentTriggerId = trigger.id;
    this.triggerForm.patchValue({
      name: trigger.name,
      description: trigger.description
    });
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly triggerService: TriggerService,
    private readonly toastr: ToastrService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.triggerForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.queryParamMap.get('addictionId');
    this.addictionId = idParam ? +idParam : 0;
    if (!this.addictionId) {
      this.toastr.error('Invalid addiction ID!');
      return;
    }
    this.getTriggers();
  }

  onSubmit() {
    if (!this.addictionId) {
      this.toastr.error('Invalid addiction selected!');
      return;
    }

    if (this.triggerForm.invalid) {
      this.toastr.warning('Please fill all required fields');
      return;
    }

    if (this.isEditMode && this.currentTriggerId) {
      this.updateTrigger(this.currentTriggerId);
    } else {
      const triggerRequest: TriggerRequest = this.triggerForm.value;
      this.triggerService.createTrigger(this.addictionId, triggerRequest).subscribe({
        next: () => {
          this.resetForm();
          this.getTriggers();
        },
        error: (err) => console.error('Error adding trigger:', err)
      });
    }
  }

  getTriggers(): void {
    this.triggerService.fetchTriggers(this.addictionId)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (triggers) => {
          this.triggers = triggers;
        },
        error: (err) => {
          if (err.status === 400) {
            this.toastr.error('Invalid addiction ID');
            this.goBack();
          } else this.toastr.error('Failed to load triggers');
        }
      });
  }



  goBack() {
    this.router.navigate(['../my-addictions']).then(() => {});
  }

  deleteTrigger(id: number) {
    if (!confirm('Are you sure you want to delete this trigger?')) {
      return;
    }
    this.triggerService.deleteTrigger(id).subscribe({
      next: () => {
        this.toastr.success(  `Trigger deleted successfully`);
      },
      error: (err) => {
        console.error('Error deleting trigger:', err);
      },
      complete: () => this.getTriggers()
    });
  }

  updateTrigger(id: number) {
    if (this.triggerForm.invalid) {
      this.toastr.warning('Please fill all required fields');
      return;
    }
    const triggerRequest: TriggerRequest = {
      ...this.triggerForm.value,
      addictionName: this.addictionName // Include addiction name
    };
    this.triggerService.updateTrigger(id, triggerRequest).subscribe({
      next: () => {
        this.toastr.success('Trigger updated successfully');
        this.resetForm();
        this.getTriggers();
      },
      error: (err) => {
        console.error('Error updating trigger:', err);
        this.toastr.error('Failed to update trigger');
      }
    });
  }

  resetForm() {
    this.triggerForm.reset();
    this.isEditMode = false;
    this.currentTriggerId = null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
