import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css','./../css-elements/modal.css','./../css-elements/forms.css']
})
export class UsersComponent implements OnInit {

	_users: any;
	_currentPageUsers: number;
	_totalPage: any = [];
	_viewActive:string = "ListaUsuarios";

	//New User Form
  _userId:number = 0;
	_userName:string = "";
	_userSName: string = "";
	_userEmail: string = "";

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
  goTo( view:string, action?:string, param?:any ){
	  	this._viewActive = view;
      //console.warn(param);
        if ( action == "update" && param != undefined ){
            this._userId     = param.id;
            this._userName   = param.nombre;
            this._userSName   = param.usuario;
            this._userEmail  = param.correo;
        }
    }

  GetUsers(page:number){

  	this._currentPageUsers = page;
  	this.request.get('usuarios?page='+page).subscribe((res)=>{
      console.warn(res.data);
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

  /*onNameKeyUp(event:any){
    this._nombre = event.target.value;
  }*/

  CRUDusers(){

    console.warn(this._action);

  	var name = $("#nombre"),
    		user = $("#usuario"),
    		mail = $("#correo"),
    		role = $("#admin"),
    		active = $("#activo"),
    		ErrorStyle = "2px solid #800000";

      if ( this._userName == "" || this._userName == undefined ){
          this._alert("danger", "Por favor ingresa un Nombre");
          name.css("border-bottom", ErrorStyle);
       }
      
      else if ( this._userSName == "" || this._userSName == undefined){
          this._alert("danger", "Por favor ingresa una Area");
          user.css("border-bottom", ErrorStyle);
      }
      
      else if ( this._userEmail == "" || this._userEmail == undefined){
          this._alert("danger", "Por favor ingresa una Area");
          mail.css("border-bottom", ErrorStyle);
      }
     
     /* else if ( this._rol == "" || this._rol == undefined  || this._rol == "init"){
          this._alert("danger", "Por favor ingresa una Area");
          role.css("border-bottom", ErrorStyle);
      }*/

     else{

      this._data = {
          nombre:  this._userName,
          usuario: this._userSName,
          correo:  this._userEmail,
          //activo: 1
       }

      name.attr("style","");
      user.attr("style","");
      mail.attr("style","");
      role.attr("style","");
      active.attr("style","");
    console.warn(this._data);
  	
      switch (this._action) {
    		case "create":
        		this.request.post('usuarios', this._data )
            .subscribe((res)=>{
      		  	 	this._alert("success", "Registro Agregado Con Exito");
        					this.GetUsers(1);
        					this.goTo('ListaUsuarios');
      			})
        break;

        case "update":
            this.request.put('usuarios', this._userId, this._data )
            .subscribe((res)=>{
                 this._alert("success", "Registro Agregado Con Exito");
                  this.GetUsers(1);
                  this.goTo('ListaUsuarios');
            })
        break;
    	}	
  	}
  	this._data = "";
  }

}

