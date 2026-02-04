import {Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
  selector: 'app-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css'
})
export class ConfirmModalComponent {
  @Input() title: string = 'Confirm Deletion';
  @Input() message: string = 'Are you sure you want to delete this item?';
  @Input() warningMessage: string = '';
  @Input() confirmButtonText: string = 'Delete';
  @Input() isProcessing: boolean = false;

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  confirm() {
    this.confirmed.emit();
  }

  cancel() {
    this.cancelled.emit();
  }
}
