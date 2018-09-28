import { Component, OnInit } from '@angular/core';
import { task } from '../models/task';
import { LIST } from '../models/task-lists';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./../index/app.component.css']//'./../index/app.component.css' tasks
})

export class TasksComponent implements OnInit {
	tarea =  LIST;

  constructor() { }

  ngOnInit() {
  	//console.warn(this.tarea);
  }

}
