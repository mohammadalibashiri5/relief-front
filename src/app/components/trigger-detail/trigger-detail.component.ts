import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {TriggerResponse} from '../../models/ResponseModel/triggerResponse';

@Component({
  selector: 'app-trigger-detail',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './trigger-detail.component.html',
  styleUrl: './trigger-detail.component.css'
})
export class TriggerDetailComponent implements OnInit {
  ngOnInit(): void {
  }

  triggers: TriggerResponse[] = [];
  @Output() edit = new EventEmitter<TriggerResponse>();
  @Output() delete = new EventEmitter<string>();
}
