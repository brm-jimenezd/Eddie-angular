import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { task } from '../models/task';
import { LIST } from '../models/task-lists';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./../css-elements/forms.css','./../tasks/tasks.component.css']
})
export class EditTaskComponent implements OnInit {
	detail: task;
  constructor( private route: ActivatedRoute ) { }

  getSelected(id:any){
  	for (var i = 0; i <= LIST.length -1; i++) {
	  		if( LIST[i].id == id ){
	  				this.detail = LIST[i];
	  				console.warn(this.detail);
	  			break;
	  		}
  	}
  }

  ngOnInit() {
  	const id = this.route.snapshot.paramMap.get('id');
  		this.getSelected(id);
  		console.warn(this.detail)
  }

}
