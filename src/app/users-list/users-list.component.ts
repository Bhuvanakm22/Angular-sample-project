import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DUMMY_DATA } from '../DUMMY_DATA';
import { UserComponent } from "../user/user.component";
import { TaskListComponent } from "../task-list/task-list.component";
import { NgFor,NgIf } from '@angular/common';
import type { User} from '../user/user.model'

@Component({
  selector: 'app-users-list',
  imports: [UserComponent, TaskListComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  users:User[]=DUMMY_DATA;
  selectedUserid?:string;
  //@Input({required:true}) selectedUser?:string;
  //@Output() select=new EventEmitter<string>();


get selectedUserr()
{
  return this.users.find((user)=> user.id===this.selectedUserid)
}

  
onSelectUser(id:string)
{
  this.selectedUserid=id;
}
}
