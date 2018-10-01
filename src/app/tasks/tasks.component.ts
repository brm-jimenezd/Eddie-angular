import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
	

  constructor( public request: RequestService) { }
  //Variables que se usan en la vista
  _ots:any;
  _currentPage:number
	_totalMarcas:any;
	_totalPage:any = [];

  ngOnInit() {
  	this.getOts(1);
  }

  	getOts(page:number){
  		let id = 1;
  		this.request.get('ots/'+id+'?page='+page).subscribe((res)=>{
  			this._ots = res.data;
  			this._currentPage   = res.current_page;
      	this._totalMarcas   = res.total;

        console.warn(this._ots);

      		if (this._totalPage.length == 0){
      	  	 	for (var i = 1; i <= parseInt(res.last_page); i++) {
      	  	 			this._totalPage.push(i);
      	  	 		}
      	  	}
		 });
	}

}
