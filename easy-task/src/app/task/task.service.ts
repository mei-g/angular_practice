import { Injectable } from "@angular/core";
import { dummyTasks } from "../dummy-tasks"

import { type NewTaskData } from "./stask/task.model";

@Injectable({providedIn:'root'})
export class TaskService {
    private tasks = [...dummyTasks];
    constructor(){
        const saveTasks = localStorage.getItem('tasks');
        if(saveTasks) {
            this.tasks = JSON.parse(saveTasks);

        }
    }

    getUserTasks(userId: string) {
        console.log("task service get userid: " + userId);
        return this.tasks.filter((task)=> task.userId === userId);
    }

    addTask (taskData: NewTaskData, userId: string) {
        console.log("task service addTask");
        this.tasks.unshift({
            id: "t" + this.tasks.length + 1, 
            userId: userId, 
            title: taskData.title,
            summary: taskData.summary,
            dueDate: taskData.date
          });  
          this.saveTasks();

    }
    deleteTask(id:  string){
        this.tasks =  this.tasks.filter((task) => task.id !== id)
        this.saveTasks();
    }

    private saveTasks(){
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}