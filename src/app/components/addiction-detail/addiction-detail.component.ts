import {Component, inject, output} from '@angular/core';
import {Router} from "@angular/router";
import {AddictionResponse} from "../../models/ResponseModel/addictionResponse";
import {AddictionService} from "../../services/addiction.service";
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-addiction-detail',
  imports: [
    NgClass,

  ],
  templateUrl: './addiction-detail.component.html',
  styleUrl: './addiction-detail.component.css'
})
export class AddictionDetailComponent {

  edit = output<AddictionResponse>();
  delete = output<number>();

  private readonly addictionService: AddictionService = inject(AddictionService);
  private readonly router: Router = inject(Router);

  addictions = this.addictionService.addictions;
  loading = this.addictionService.loading;


  onEdit(addiction: AddictionResponse): void {
    this.edit.emit(addiction);
  }

  onDelete(id: number): void {
    this.delete.emit(id);
  }

  goToTriggers(addictionId: number): void {
    this.router.navigate(['/triggers'], {
      queryParams: {
        addictionId,
      }
    }).then();
  }

}
