import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { AuthGuardianService } from '../services/auth/auth-guardian.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./../css-elements/forms.css','./clientes.component.css', './../css-elements/table.css']
})
export class ClientesComponent implements OnInit {

	//clientes
	_clientes: any;
	_currentPage: number;
	_totalClientes:number;
	_totalPage:any = [];
	_viewActive:any;
	_currentAction: any;
	
	//Ciudades
	_ciudades:any;

	//ngModels
	_indety: number;
	_name:string;
	_address:string;
	_phone:number;
	_email:string;
	_city:string;

	//modelo para envio de formulario
	_data:any;

	//alerts
   _alertClass:string;
   _alertText:string;
   _alertState:boolean;

  constructor( public request: RequestService, public auth: AuthGuardianService) { }

	  ngOnInit() {
	  	this.getClientes(1);
	  	this._viewActive = "panel";
	  	this._currentAction = "";
	  	this.auth.asAdmin();	
	  }

	//Funcion para mostrar las alertas
	  _alert(state, text){
		    this._alertClass = "alert-"+state;
		    this._alertText = text;
		    this._alertState = true;
	  }

 	getClientes(page:number){
  		this.request.get('clientes?page='+page).subscribe((res)=>{
      	this._clientes      = res.data;
      	this._currentPage   = res.current_page;
      	this._totalClientes = res.total;

      		console.warn(this._totalPage);
      	 	if (this._totalPage.length == 0){
      	  	 	for (var i = 1; i <= parseInt(res.last_page); i++) {
      	  	 			this._totalPage.push(i);
      	  	 		}
      	  	}
    			return res;
		    });
	}

	getCiudades(page:number){
		console.error("cargar solo en la vista");
  		this.request.get('ciudades?page='+page).subscribe((res)=>{
  			this._ciudades = res.data;
		 });
	}

	go(view:string,action?:string, data?:any ){
		this._viewActive = view;
		this._currentAction = (action != "")? action : "";

		//console.warn(data);
		if ( action == "edit" ){
			this._indety  = data.id;
			this._name    = data.nombre;
			this._address = data.direccion;
			this._phone   = data.telefono;
			this._email   = data.correo;
			this._city    = data.id_ciudad;
		}

		this.getCiudades(1);
		this._alertState = false;
	}

	save(){
		if ( this._name == undefined || this._name == ""){
			 this._alert("danger", "Ingresa un nombre");
		}

		if ( this._address == undefined || this._address == ""){
			 this._alert("danger", "Ingresa un email");
		}

		if ( this._phone == undefined ){//validar si esta vacio
			this._alert("danger", "Ingresa un télofono válido");	
		}

		if ( this._email == undefined || this._email == ""){
			this._alert("danger", "Ingresa un email");	
		}

		if ( this._city == undefined || this._city == "init"){
			this._alert("danger", "Ingresa una ciudado");		
		}else{

			this._data = { 
					nombre: this._name,
					direccion : this._address,
					telefono: this._phone,
					correo: this._email,
					activo: 1,
					id_ciudad: this._city,
				}
			//console.warn("identy", this._indety );
			//console.warn(this._currentAction);

			switch (this._currentAction) {
				case "edit":
					this.request.put('clientes', this._indety, this._data ).subscribe((res)=>{
			            this._alert("success", "Registro Editado Con Exito");
			                this.getClientes(this._currentPage);
			            this.go('panel');
			        }); 
				break;

				case "create":
					this.request.post('clientes', this._data ).subscribe((res)=>{
			            this._alert("success", "Registro Agregado Con Exito");
			                this.getClientes(1);
			            this.go('panel');
			        }); 
				break;
			}
			
		}

	}


	 delete(param:any){
        this.request.delete("clientes", param).subscribe((res)=>{
        	this._alert("success", "Registro Eliminado Con Exito");
                this.getClientes(this._currentPage);
                this.go('panel');
        });
    }

}
