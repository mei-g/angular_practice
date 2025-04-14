import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
// import { TaskService } from './task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [NewTaskComponent, TasksListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // element injector
  // providers: [TaskService]
})
export class TasksComponent {}
