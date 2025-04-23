import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { type  Task } from './task.model'
import { CardComponent } from "../../shared/card/card.component";
import { DatePipe } from '@angular/common';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-stask',
  standalone: true,
  templateUrl: './stask.component.html',
  styleUrl: './stask.component.css',
  imports: [CardComponent, DatePipe]
})
export class StaskComponent {

@Input({required:true}) title!:string;
@Input({required:true}) time!:string;
@Input({required:true}) summary!:string;
@Input({required:true}) task!: Task;
private tasksvc = Inject(TaskService);

@Output() complete = new EventEmitter<string>();

onCompleteTask() {
  this.complete.emit(this.task.id);
  // this.tasksvc.deleteTask(this.task.id);
}

}
