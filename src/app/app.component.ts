import { Component, computed, CUSTOM_ELEMENTS_SCHEMA ,EventEmitter,inject,input,Input,output,Output,signal,Signal,Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators ,ReactiveFormsModule} from '@angular/forms';
import { TaskListComponent } from './todo-list/todo-list.component';
import { DUMMY_DATA } from './DUMMY_DATA';
import { retry } from 'rxjs';
import { UserComponent } from "./user/user.component";
import { UsersListComponent } from "./users-list/users-list.component";
import { TasksService } from './task-list/tasks.serive';

//Object type
type newuser={
  id:string;
  name:string;
  Avatar:string;
}
//Interface
interface User
{
  id:string;
  name:string;
  Avatar:string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule, TaskListComponent, UsersListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA] 
})
export class AppComponent {
  title = 'Task Management App';
  #hashtagval="Task Management";  //This DOM variable with # can be used in html template.
@Input({required:true}) olduser!: {
id:string;
name:string;
Avatar:string;
}; //Method 1 Object type not a object creation
@Input({required:true}) newuser!:newuser; //Method 2 Object type 
@Input({required:true}) user!:User; //Method 3 Object type

  //Method 1 using normal array property which does NOT track changes automatically:
  selectedItem=DUMMY_DATA[0];
  Avatars=`assets/users/${this.selectedItem.Avatar}`
  //Method 2 using signal property value which does track changes automatically:
  selectedItem1=signal(DUMMY_DATA[0]); //"signal" is used to track the property value changes like "subscribe" method
  Avatar=computed(()=>`assets/users/${this.selectedItem1().Avatar}`) //"computed" used to track the selectedItem prop changes and change itself accordingly
//Note: Above signal prop needs to be used like method "selectedItem()" instead of "selectedItem"

  //Method 1 Normal input decoorator 
  @Input({required:true}) Name!:string;  //"Input decorator" to get an input from other components/parent component
  //Method 2
  Avatar1=input.required<string>(); //"Input function" which does track data change with "Required" input
  Avatar2=input<string>(); //Optional input

  //Method 1 Normal output decorator with any type of data
  @Output() selects=new EventEmitter();
    //Method 2 Normal output decorator with string type of data
  @Output() selects1=new EventEmitter<string>();
  //Method 3 signal output with strict data type restriction
  selects2=output<string>();

  //Method 1 Normal "Property"
  get imagePath()
  {
    return `assets/users/${this.selectedItem.Avatar}`;
  }
  //Method 2 computed signal property to track changes on the propery
  imagePath1=computed(()=> 
    {
      return `assets/users/${this.selectedItem1().Avatar}`;
    }
  )
 taskService=inject(TasksService);
 
 isTodoAddUser!:boolean;
  constructor()
  {
    this.isTodoAddUser=false;
    this.taskService.removeTasksLocalStore();
    //Input and output decorators implementation
    this.selectedItem=DUMMY_DATA[1];  // Assign new value to the normal array variable
    this.selectedItem1.set(DUMMY_DATA[1]); // Assign value to the signal variable which does track data change automatically like subscribe()
    this.selects.emit('NormalOut');
    this.selects1.emit('EventEmitter');
    this.selects1.emit('signalOut');

    console.log(this.#hashtagval)
     const objBox=new Box("TypeTest");
     console.log(objBox.contents);
  }
  onViewTodoHrefClick()
{
  this.isTodoAddUser=true;
}
BackToView()
{
  this.isTodoAddUser=false;
}
}
//Below contents variable is NOT possible bcz there is Type/Generic template in class declaration BOX
// class Box {
//   contents: Type;
//   constructor(value: Type) {
//     this.contents = value;
//   }
// }
//If wee want to use Type/Generic template variable we need to declare the type in class name too.
class Box<Type> {
  contents: Type;
  constructor(value: Type) {
    this.contents = value;
  }

}
