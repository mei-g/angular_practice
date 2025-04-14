import { Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');
  //won't share one same task service. use dependency injection: platform/app root/module/element injector.
  // private taskService: TaskService;

  constructor(private taskService: TaskService){
    // this.taskService = tService;
  }

  onAddTask(title: string, description: string) {
    this.taskService.addTask({title:title, description:description});
    this.formEl()?.nativeElement.reset();
  }
}
