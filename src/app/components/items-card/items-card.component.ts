import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-items-card',
  imports: [],
  templateUrl: './items-card.component.html',
  styleUrl: './items-card.component.css'
})
export class ItemsCardComponent {
  @Input() iconClass: string = '';
  @Input() title: string = '';

}
