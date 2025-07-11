import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-header-management',
  imports: [],
  templateUrl: './header-management.component.html',
  styleUrl: './header-management.component.css'
})
export class HeaderManagementComponent {
  @Input() iconClass: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
}
