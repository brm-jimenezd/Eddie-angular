import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersListComponent implements OnInit {


	_users: any;
	_currentPageUsers: number;
	_totalPage: any = [];


  constructor( public request: RequestService ) { }

  ngOnInit() {
  this.GetUsers(1);
  }

  GetUsers(page:number){
  	this._currentPageUsers = page;

  	this.request.get('usuarios?page='+page).subscribe((res)=>{
  	this._users = res.data;
  	this._currentPageUsers = res.current_page;

  	if (this._totalPage.length == 0){
	  	 		for (var i = 1; i <= parseInt(res.last_page); i++) {
	  	 			this._totalPage.push(i);
	  	 		}
	  	 	}
			return res;

  	});

  }

}