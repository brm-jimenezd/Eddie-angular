import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { AuthGuardianService } from '../services/auth/auth-guardian.service';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./../css-elements/forms.css','./marcas.component.css', './../css-elements/table.css']
})
export class MarcasComponent implements OnInit {

	//clientes
	_marcas: any;
	_currentPage: number;
	_totalMarcas:number;
	_totalPage:any = [];
	_viewActive:any;
	_currentAction: any;
	_ciudades:any;
	_clientes:any;

	//ngModels
	_indety: number;
	_marcasIndety:number;
	_marcasName:string;
	_marcasAddress:string;
	_marcasPhone:number;
	_marcasEmail:string;
	_marcasCity:string;
	_marcasCliente:string;

	//alerts
   _alertClass:string;
   _alertText:string;
   _alertState:boolean;

   //data
   _data: any;

  constructor( public request: RequestService, public auth: AuthGuardianService ) { }

  ngOnInit() {
  	this.getMarcas(1);
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

  	getCiudades(page:number){
  		this.request.get('ciudades?page='+page).subscribe((res)=>{
  			this._ciudades = res.data;
		 });
	}

  	getMarcas(page:number){
  		this.request.get('marcas?page='+page).subscribe((res)=>{
      	this._marcas        = res.data;
      	this._currentPage   = res.current_page;
      	this._totalMarcas   = res.total;

      	 	if (this._totalPage.length == 0){
      	  	 	for (var i = 1; i <= parseInt(res.last_page); i++) {
      	  	 			this._totalPage.push(i);
      	  	 		}
      	  	}
    			return res;
		    });
	}

	getClientes(page:number){
  		this.request.get('clientes?page='+page).subscribe((res)=>{
      			this._clientes = res.data;
		});
	}

	go(view:string,action?:string, data?:any ){
		this._viewActive = view;
		this._currentAction = (action != "")? action : "";

			if ( action == "edit" ){
				this._marcasIndety  = data.id;
				this._marcasName    = data.nombre;
				this._marcasAddress = data.direccion;
				this._marcasPhone   = data.telefono;
				this._marcasEmail   = data.correo;
				this._marcasCity    = data.id_ciudad;
				this._marcasCliente = data.id_cliente;
			}

		this.getCiudades(1);
		this.getClientes(1);
		this._alertState = false;
	}

	clear(){
		this._marcasName = "";
		this._marcasName = "";
		this._marcasAddress = "";
		this._marcasPhone;
		this._marcasEmail = "";
		this._marcasCity = "";
		this._marcasCliente = "";
	}

	save(){
		if ( this._marcasName == undefined || this._marcasName == ""){
			 this._alert("danger", "Ingresa un Nombre");
			 		return false;
		}

		if ( this._marcasAddress == undefined || this._marcasAddress == ""){
			 this._alert("danger", "Ingresa un Dirección");
			 		return false;
		}

		if ( this._marcasPhone == undefined ){//validar si esta vacio
			this._alert("danger", "Ingresa un télofono válido");
					return false;	
		}

		if ( this._marcasEmail == undefined || this._marcasEmail == ""){
			this._alert("danger", "Ingresa un Email");	
					return false;
		}

		if ( this._marcasCity == undefined || this._marcasCity == "init"){
			this._alert("danger", "Ingresa una Ciudad");
					return false;		
		}

		if ( this._marcasCliente == undefined || this._marcasCliente == "init"){
			this._alert("danger", "Ingresa un Cliente");	
					return false;	
		}

		else{

			this._data = { 
					nombre: this._marcasName,
					direccion : this._marcasAddress,
					telefono: this._marcasPhone,
					correo: this._marcasEmail,
					activo: 1,
					id_ciudad: this._marcasCity,
					id_cliente: this._marcasCliente
			}

			switch (this._currentAction) {
				case "edit":
					this.request.put('marcas', this._marcasIndety, this._data ).subscribe((res)=>{
			            this._alert("success", "Registro Editado Con Exito");
			                this.getMarcas(this._currentPage);
			            this.go('panel');
			        }); 
				break;

				case "create":
					this.request.post('marcas', this._data ).subscribe((res)=>{
			            this._alert("success", "Registro Agregado Con Exito");
			                this.getMarcas(1);
			            this.go('panel');
			        }); 
				break;
			}
			this.clear();
			
		}

	}

}
