import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {SolutionService} from '../../services/solution.service';
import {SolutionResponse} from '../../models/ResponseModel/solutionResponse';


@Component({
  selector: 'app-solution-manager',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './solution-manager.component.html',
  styleUrl: './solution-manager.component.css'
})
export class SolutionManagerComponent {
  solutionForm: FormGroup;
  solutions!:SolutionResponse

  constructor(private fb: FormBuilder, private solution:SolutionService) {
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
