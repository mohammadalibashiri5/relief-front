import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-card-with-action',
  imports: [
    NgIf
  ],
  standalone: true,
  templateUrl: './card-with-action.component.html',
  styleUrl: './card-with-action.component.css'
})
export class CardWithActionComponent {
  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() badgeText: string = '';
  @Input() showActions: boolean = true;

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/default-image.webp';
  }
}
