import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type NewTaskData } from "../stask/task.model"
import { CardComponent } from "../../shared/card/card.component";

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, CardComponent],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  @Output() newTaskCancel = new EventEmitter<void>();
  @Output() newTaskAdd = new EventEmitter<NewTaskData>();
  enteredTitle='';
  enteredSummary='';
  enteredDate='';


  onCancel(){
     this.newTaskCancel.emit();
  }
  onSubmit(){
     this.newTaskAdd.emit({title: this.enteredTitle, summary:this.enteredSummary, date: this.enteredDate});
  }
}
