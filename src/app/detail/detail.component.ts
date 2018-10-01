import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { task } from '../models/task';
import { LIST } from '../models/task-lists';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  detailTask: task;
  constructor(  private route: ActivatedRoute ) { }

  getSelected(id:any){
  	for (var i = 0; i <= LIST.length -1; i++) {
	  		if( LIST[i].id == id ){
	  				this.detailTask = LIST[i];
	  			break;
	  		}
  	}
  }

  ngOnInit() {
  	 const id = this.route.snapshot.paramMap.get('id');
  		this.getSelected(id)

  }
  
}
