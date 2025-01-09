import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators ,ReactiveFormsModule} from '@angular/forms';
import { DUMMY_DATA } from '../DUMMY_DATA';
import type { User } from '../user/user.model';

@Component({
  selector: 'app-todo-list',
  imports: [  CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TaskListComponent {
public users:User[] = DUMMY_DATA; 
  public userForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });
  
  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  addToList()
  {
    const name=this.userForm.get('name')?.value;
    if(name!=null&&name!==undefined&& name!=='')
    {
      const uid=`u${(this.users.length+1)}` ;
    this.users.push({id:uid,name:name,Avatar:`${name}.png`});    
    this.userForm.reset(); // Clear the input after adding to the list
    }
    else
      this.userForm.controls.name.setErrors({'touched': true});    
  }
  deleteToDo(index:number)
  {
      this.users.splice(index,1)
  }
  get name() {
    return this.userForm.get('name');
  }
}
