import { Component, EventEmitter, inject, Input, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import type {NewTaskData} from '../task/task.model'
import { TasksService } from '../tasks.serive';
@Component({
  selector: 'app-new-task',
  imports: [FormsModule,CommonModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  @Input({required:true}) userId!:string;
  @Output() close=new EventEmitter<void>();
//@Output() additionalAdd=new EventEmitter<{title:string;summary:string;date:string}>();
enteredTitle='';
enteredSummary='';
enteredDate='';
private tasksService=inject(TasksService)
  onCancel()
  {
    this.close.emit();
  }
  onAdditionalSubmit()
  {
    // this.additionalAdd.emit(
    //   {
    //     title:this.enteredTitle,
    //     summary:this.enteredSummary,
    //     date:this.enteredDate
    //   }
    // )

  }
  onSubmit()
  {
    this.tasksService.addTask(
      {
        title:this.enteredTitle,
        summary:this.enteredSummary,
        date:this.enteredDate
      },
      this.userId
    )
    this.close.emit();

  }
}
