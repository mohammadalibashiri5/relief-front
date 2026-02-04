import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import {SolutionService} from '../../services/solution.service';
import {SolutionResponse} from '../../models/ResponseModel/solutionResponse';


@Component({
  selector: 'app-solution-manager',
  imports: [
    ReactiveFormsModule
],
  templateUrl: './solution-manager.component.html',
  styleUrl: './solution-manager.component.css'
})
export class SolutionManagerComponent {
  solutionForm: FormGroup;
  solutions!:SolutionResponse

  constructor(private readonly fb: FormBuilder, private readonly solution:SolutionService) {
    this.solutionForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  submitSolution(): void {
    if (this.solutionForm.valid) {
      // Add your submission logic here
      this.solution.addSolution(this.solutionForm.value).subscribe({
        next:(solution) => {
         this.solutions = solution;
        },
        error:(err)=> {
          console.log(err)
        }
      })
    }
  }

}
