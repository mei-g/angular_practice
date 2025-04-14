import { Component, signal, inject, computed, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from '../task.service';
import { LoggingService } from '../../logging.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListComponent {
  private selectedFilter = signal<string>('all');
  private taskSevice = inject(TaskService);
  private logService = inject(LoggingService);
  // use async pipes.
  private cdRef = inject(ChangeDetectorRef);

  // tasks = this.taskSevice.allTasks;
  tasks = computed(()=>{
     switch (this.selectedFilter()) {
      case 'all':
         return this.taskSevice.allTasks();
      case 'open':
         return this.taskSevice.allTasks().filter((task) => task.status === 'OPEN');
      case 'in-progress':
         return this.taskSevice.allTasks().filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
          return this.taskSevice.allTasks().filter((task) => task.status === 'DONE');
      default:
        return this.taskSevice.allTasks();
     }
  });


  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
    this.logService.log('task filter changed');
  }
}
