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
}
