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
  addictionName!:string;

  constructor(
    private fb: FormBuilder,
    private triggerService: TriggerService,
    private toastr: ToastrService,
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.triggerForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.addictionName = this.route.snapshot.queryParamMap.get('addictionName') || '';
    console.log('Route Params:', this.route.snapshot.params);

// Check query parameters (URL?key=value)
    console.log('Query Params:', this.route.snapshot.queryParams);

// Check fragment (URL#hash)
    console.log('Fragment:', this.route.snapshot.fragment);    this.getTriggers();
  }

  onSubmit() {
    if (this.addictionName === undefined) {
      this.toastr.error('Invalid addiction selected!');
      return;
    }
    if (this.triggerForm.valid) {
      const triggerRequest: TriggerRequest = this.triggerForm.value;

      this.triggerService.createTrigger(this.addictionName, triggerRequest).subscribe({
        next: () => {
          this.toastr.success('Trigger added successfully');
          this.triggerForm.reset();
        },
        error: (err) => console.error('Error adding trigger:', err),
        complete: () => this.getTriggers()
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
}
