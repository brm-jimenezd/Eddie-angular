import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

	_users: any;
	_currentPageUsers: number;
	_totalPage: any = [];
	_viewActive:string = "ListaUsuarios";

	//New User Form
	_nombre:string='';
	_usuario: string;
	_correo: any;
	_fecha: any;
  _data: any;

  constructor( public request: RequestService ) { }

  ngOnInit() {
  this.GetUsers(1);
  }

  goTo(view){
	  	this._viewActive = view;
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

  onNameKeyUp(event:any){

    this._nombre = event.target.value;
  
  }

  postNewUser(){
    /*let data = {
      nombre:"Nuevo",
      usuario:"Nuevo.usuario",
      correo:"nuevo@correo.com",
      priv_admin: 1,
      activo:1,
    }*/

    
  }

}
