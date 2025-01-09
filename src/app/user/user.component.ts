import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { User} from './user.model'
import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-user',
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
@Input({required:true}) user!:User; //Object type with interface
@Input({required:true}) selected!:boolean;
@Output() select=new EventEmitter<string>();
//"Property"
get imageURL()
{
  return `./asset/users/${this.user.Avatar}`;
}
onSelectUser(id:string)
{
   this.select.emit(this.user.id);
}
}
