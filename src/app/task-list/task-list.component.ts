import { Component, inject, Input } from '@angular/core';
import { TaskComponent } from "./task/task.component";
import type { Task } from './task/task.model';
import { NewTaskComponent } from "./new-task/new-task.component";
import type {NewTaskData} from './task/task.model'
import {TasksService} from './tasks.serive'
@Component({
  selector: 'app-task-list',
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
@Input({required:true}) userid!:string;
@Input({required:true}) name!:string;
isAddingTask=false;
private taskService=inject(TasksService)
// constructor(private taskService:TasksService) //Dependency injection with service obj creation
// {

// }
get selectedUserTasks()
{
  return this.taskService.getUserTasks(this.userid);
}

onStartAddTask()
{
this.isAddingTask=true;
}

onCloseAddTask()
{
  this.isAddingTask=false ;
}

}
