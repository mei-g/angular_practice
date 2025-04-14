import { inject, Injectable, signal } from "@angular/core";
import {Task, TaskStatus } from './task.model'
import { LoggingService } from "../logging.service";

@Injectable({providedIn:'root'})
export class TaskService {
    private logService = inject(LoggingService);

    private tasks = signal<Task[]>([]);
    allTasks = this.tasks.asReadonly();
    addTask(TaskData: {title:string; description:string}) {
        const newTask:Task = {
            ...TaskData,
            id: 't'+this.tasks.length + 1,
            status: 'OPEN'
        } 
        this.tasks.update((oldTask)=>[...oldTask, newTask])
    }
    updateTaskStatus(id:string, newStatus: TaskStatus) {
        this.tasks.update((oldTasks)=> oldTasks.map((task) => task.id === id? {...task, status: newStatus}: task))
    }
}