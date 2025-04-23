import {Component, OnInit} from '@angular/core';
import {TriggerService} from '../../services/trigger.service';
import {TriggerResponse} from '../../models/ResponseModel/triggerResponse';
import {ToastrService} from 'ngx-toastr';
import {NgForOf, NgIf} from '@angular/common';
import {TriggerRequest} from '../../models/RequestModel/triggerRequest';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-trigger',
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './trigger-manager.component.html',
  styleUrl: './trigger-manager.component.css'
})
export class TriggerManagerComponent implements OnInit {
  triggers: TriggerResponse[] = [];
  triggerForm: FormGroup;
  addictionName!: string;
  isEditMode = false;
  currentTriggerId: number | null = null;


  editTrigger(trigger: TriggerResponse) {
    this.isEditMode = true;
    this.currentTriggerId = trigger.id;
    this.triggerForm.patchValue({
      name: trigger.name,
      description: trigger.description
    });
  }

  constructor(
    private fb: FormBuilder,
    private triggerService: TriggerService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.triggerForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.addictionName = this.route.snapshot.queryParamMap.get('addictionName') || '';
    this.getTriggers();
  }

  onSubmit() {
    if (!this.addictionName) {
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
      this.triggerService.createTrigger(this.addictionName, triggerRequest).subscribe({
        next: () => {
          this.toastr.success('Trigger added successfully');
          this.resetForm();
          this.getTriggers();
        },
        error: (err) => console.error('Error adding trigger:', err)
      });
    }
  }

  getTriggers() {
    this.triggerService.fetchTriggers().subscribe({
      next: (triggers) => {
        this.triggers = triggers;
      },
      error: () => {
        this.toastr.error('Failed to load triggers');
      }
    });
  }


  goBack() {
    this.router.navigate(['../my-addictions']).then(() => {});
  }

  deleteTrigger(triggerName: string) {
    if (!confirm('Are you sure you want to delete this trigger?')) {
      return;
    }
    this.triggerService.deleteTrigger(triggerName).subscribe({
      next: () => {
        this.toastr.success(  `${triggerName } deleted successfully`, triggerName );
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
}
