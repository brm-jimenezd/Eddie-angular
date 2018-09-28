import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';

declare var jQuery:any;
declare var $:any;

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
	_rol: any;
	_acive:any;
  	_data: any;
  	_action: string = "create";

  	//alerts
   _alertClass:string;
   _alertText:string;
   _alertState:boolean;

  constructor( public request: RequestService ) { }

  ngOnInit() {
  this.GetUsers(1);
 
  }

  //Funcion para mostrar las alertas
  _alert(state, text){
    this._alertClass = "alert-"+state;
    this._alertText = text;
    this._alertState = true;

    $("#company-alert").fadeIn("fast", function(){
      $(this).fadeOut(9000);
    })
  }

   //ir a la vista seleccionada
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

  CRUDusers(){

  	var name = $("#nombre"),
  		user = $("#usuario"),
  		mail = $("#correo"),
  		role = $("#admin"),
  		active = $("#activo"),
  		ErrorStyle = "2px solid #800000";

  	switch (this._action) {
  		case "create":
  			name.attr("style","");
  			user.attr("style","");
  			mail.attr("style","");
  			role.attr("style","");
  			active.attr("style","");

  			if ( this._nombre == "" || this._nombre == undefined ){
  					    this._alert("danger", "Por favor ingresa un Nombre");
                name.css("border-bottom", ErrorStyle);
  				}
          else if ( this._usuario == "" || this._usuario == undefined){
                this._alert("danger", "Por favor ingresa una Area");
                user.css("border-bottom", ErrorStyle);
          }
          else if ( this._correo == "" || this._correo == undefined){
                this._alert("danger", "Por favor ingresa una Area");
                mail.css("border-bottom", ErrorStyle);
          }
          else if ( this._rol == "" || this._rol == undefined  || this._rol == "init"){
                this._alert("danger", "Por favor ingresa una Area");
                role.css("border-bottom", ErrorStyle);
          }

          else{

          	this._data = {nombre:this._nombre,
          				  usuario: this._usuario,
          				  correo:this._correo,
          				  priv_admin: 1,
          				  activo: 1};
            //this._data = {nombre:this._nombre,usuario: this._usuario,correo:this._correo};
  						this.request.post('usuarios', this._data ).subscribe((res)=>{
		  	 			   console.log(res)
		  	 			   this._alert("success", "Registro Agregado Con Exito");
  								this.GetUsers(1);
  								this.goTo('ListaUsuarios');
  								console.log(this._data);
						});
  				}

  			break;
  	}
  	this._data = "";
  }

}

