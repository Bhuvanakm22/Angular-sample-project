import { Injectable } from "@angular/core";
import type { Task } from "./task/task.model";
import type {NewTaskData} from './task/task.model'
import { JsonPipe } from "@angular/common";


@Injectable({providedIn:'root'})
export class TasksService
{
    private tasks:Task[]=[
      {
        id:"t1",
        userid:"u1",
        title:"Master Angular",
        summary:"Learn all the basics",
        dueDate:"2025-12-31"
      },
      {
        id:"t2",
        userid:"u1",
        title:"Master Python",
        summary:"Learn all the basics",
        dueDate:"2025-12-31"
      },
      {
        id:"t3",
        userid:"u2",
        title:"Master PHP",
        summary:"Learn all the basics",
        dueDate:"2025-12-31"
      },
      {
        id:"t4",
        userid:"u3",
        title:"Master PHP",
        summary:"Learn all the basics",
        dueDate:"2025-12-31"
      },
    ];

    constructor()
    {
        const tasks=localStorage.getItem('tasks');
        if(tasks)
        {
            this.tasks=JSON.parse(tasks);
        }
    }
    getUserTasks(userId:string)
    {
       return this.tasks.filter((task)=> task.userid===userId)
    }

    addTask(taskData:NewTaskData,userId:string)
    {
        // this.tasks.push(  //This will append data at the "end of an array"
        this.tasks.unshift( //This will append data at the "start of an array"
        {
            id:new Date().getTime().toString(),
            userid:userId,
            title:taskData.title,
            summary:taskData.summary,
            dueDate:taskData.date
        })
        this.saveTasks();
    }
    removeTask(id:string)
    {
        this.tasks=this.tasks.filter((task)=>task.id!==id)
        this.saveTasks();
    }
    private saveTasks()
    {
        localStorage.setItem('tasks',JSON.stringify(this.tasks))
    }
     removeTasksLocalStore()
    {
        localStorage.removeItem('tasks');
    }
}