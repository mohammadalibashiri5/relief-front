import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AddictionService} from '../../services/addiction.service';
import {Router} from '@angular/router';
import {AddictionRequest} from '../../models/RequestModel/addictionRequest';
import {SeverityLevel} from '../../models/enum/SeverityLevel';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-addiction',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './addiction.component.html',
  styleUrl: './addiction.component.css'
})
export class AddictionComponent {
  addictionForm!: FormGroup;
  severityLevels = Object.values(SeverityLevel); // Extract enum values


  constructor(private formBuilder: FormBuilder, private addictionService: AddictionService, private router: Router) {
    this.addictionForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      severityLevel: [null, Validators.required],
      yearOfAddiction: [null, Validators.required],
    });
  }

  addictions: AddictionRequest[] = [];

  createAddiction() {
    let addiction: AddictionRequest = {
      name: this.addictionForm.value!.name,
      description: this.addictionForm.value!.description,
      severityLevel: this.addictionForm.value!.severityLevel,
      yearOfAddiction: this.addictionForm.value!.yearOfAddiction,
    };

    this.addictionService.addAddiction(addiction).subscribe({
        next: addiction => {
          this.addictions.push(addiction);
        },
        error: err => {
          console.log(err);
        },
        complete: () => {
          this.router.navigate(['/dashboard']).then(() => {
            alert("addiction added successfully!")
          });
        }
      }
    )
  }

}
