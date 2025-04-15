import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [
    NgIf
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  @Input() isOpen:boolean = false;
  @Input() title:string = '';
  @Input() showCloseButton:boolean = true;
  @Output() closed:EventEmitter<void> = new EventEmitter<void>();

  close() {
    this.isOpen = false;
    this.closed.emit();
  }

}
