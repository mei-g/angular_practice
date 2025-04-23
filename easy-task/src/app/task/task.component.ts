import { Component, Input, Output } from '@angular/core';
import { StaskComponent } from "./stask/stask.component";
import { dummyTasks } from '../dummy-tasks';
import { NewTaskComponent } from "./new-task/new-task.component";
import { type NewTaskData } from "./stask/task.model"
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  imports: [StaskComponent, NewTaskComponent]
})

export class TaskComponent {
  @Input ({required:true}) id!:string;
  @Input() name?: string | undefined;

  
  tasks = [...dummyTasks];

  isAddtask = false;
  // dependency injection
  constructor (private tasksvc: TaskService){}

  get selectedUserTasks () {
    console.log("task id @@@ ${this.id}" + this.id);
     return this.tasksvc.getUserTasks(this.id);
  }
  
  onCompleteTask(id: string) {
    console.log("on delete task id" + id);
    this.tasksvc.deleteTask(id);
  }
  onAddTask() {
    console.log("clicked Add Task button");
    this.isAddtask = true;
  }
  onNewTaskCancel(){
    this.isAddtask = false;

  }
  onNewTaskAdd(taskData: NewTaskData) {
    console.log('onNewTaskAdd emitter received');
    this.tasksvc.addTask(taskData, this.id);
    // this.tasks.unshift({
    //   id: "t" + this.tasks.length + 1, 
    //   userId: this.id, 
    //   title: taskData.title,
    //   summary: taskData.summary,
    //   dueDate: taskData.date
    // });

    this.isAddtask = false;
  }
}
