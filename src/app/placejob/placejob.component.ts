import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';

declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-placejob',
  templateUrl: './placejob.component.html',
  styleUrls: ['./../index/app.component.css']
})
export class PlacejobComponent implements OnInit {
	// _nombre =Nomenclatura para vairables globales
	_areas:any;
	_grupos:any;
	_usuarios:any;
	_perfiles:any;
	_addNew:any;
	_viewActive:string = "panel";
	_action: string = "create";
	_groupParmas: any;

	//Group form
	_totalPage: any = [];
	_currentPage: number;
	_grouptName: string;
	_groupArea: any;
	_data: any;
	_totalGrupos: number;

	//Areas form
	_totalPageAreas: any = [];
	_currentPageAreas: number;
	_totalAreas: number;

  constructor( public request: RequestService ) { }

  ngOnInit() {
  	this.getAreas(1);
  	this.getGrupos(1);
    this.getUsuarios();
  	//this.getPerfiles();
	  }

	goTo(view){
	  	this._viewActive = view;
	 }

  	getAreas(page:number){
  		this._currentPageAreas = page;
  		//console.info(page);
  	 	this.request.get('areas?page='+page).subscribe((res)=>{
  	 		console.warn(res);
  	 		this._areas = res.data;
  	 		this._totalAreas = res.total;

	  	 		if ( this._totalPageAreas.length == 0 ){
		  	 		for (var i = 1; i <= parseInt(res.last_page); i++) {
		  	 			this._totalPageAreas.push(i);
		  	 		}
		  	 	}
			return res;
		});
  	}

  	getGrupos(page:number){
  		//this._currentPage = page;

  	 	 	this.request.get('grupos?page='+page).subscribe((res)=>{
  	 		this._grupos = res.data;
  	 		this._currentPage = res.current_page;
  	 		this._totalGrupos = res.total;
  	 		
  	 		if (this._totalPage.length == 0){
	  	 		for (var i = 1; i <= parseInt(res.last_page); i++) {
	  	 			this._totalPage.push(i);
	  	 		}
	  	 	}
			return res;
		});
  	}

  	getPerfiles(){
    	 	this.request.get('perfiles').subscribe((res)=>{
    	 		this._perfiles = res;
    	 		//console.warn("perfiles:", this._perfiles);
  			  return res;
  		  });
  	}

    getUsuarios(){
         this.request.get('usuarios').subscribe((res)=>{
           this._usuarios = res;
           //console.warn("perfiles:", this._perfiles);
          return res;
        });
    }

  	/*Agregar


  	agregarArea(){
  		let data =  {
  			nombre:"Nuevo",
  			id_area:1,
  			id_ciudad: 1,
			id_usuario_jefe: 1,
  		};
  		this.request.post('areas', data ).subscribe((res)=>{
  	 		//this._areas = res;
  	 		console.warn(data);
  	 		this._areas.push(data)
			//return res;
		});
  	}

  	agregarPerfiles(){
  		let data =  {
  			nombre:"Nuevo Perfil",
  			id_grupo:1
  		};

  		this.request.post('perfiles', data ).subscribe((res)=>{
  	 		//this._areas = res;
  	 		console.warn(data);
  	 		this._perfiles.push(data)
			//return res;
		});
  	}
  	*/

  	/*Eliminar*/
  	select(event){
  		console.warn("info");
  		var value = $(event.target).val();
  	}

  	CRUDareas(){
      console.info("las areas dentro del crud");
  			console.warn(this._action);
  		switch (this._action) {
  			case "value":
  				// code...
  				break;
  			
  			case "update":
  				var nombre    = $("#areas-name").val(),
  					id_ciudad = $("#areas-city").val(),
  					id_		  = $("#areas-id").val(),
  					id_usuario_jefe = $("#area-jefe").attr("data-id")

  					console.warn(nombre);
  					console.warn(id_ciudad);
  					console.warn(id_);
  					console.warn(id_usuario_jefe);
					
					
						this.request.put('areas', id_, { nombre: nombre ,id_ciudad: id_ciudad,id_usuario_jefe:id_usuario_jefe } ).subscribe((res)=>{
							alert("cambios realizados con exito1111");
								//this.getGrupos(this._currentPage);
								//this.goTo('panel');
						});
				
  			break;

        case "create":
          console.error("energia!");
        break;
  		}
  	}

  	CRUDgrupos(){

  		switch (this._action) {
  			/*case "create":
  				if ( this._grouptName == "" || this._grouptName == undefined || this._groupArea == "" || this._groupArea == undefined ){
  					alert("Los datos no pueden estar vacios");
  				}else{

  						this.request.post('grupos', {nombre:this._grouptName,id_area: this._groupArea} ).subscribe((res)=>{
		  	 			//	this._grupos.push(data);
								alert("Registro agregado con exito");
								this.getGrupos(1);
								this.goTo('panel');
						});
  				}
  				
  			
  			break;*/

  			case "update":
  				var nombre  = $("#group-name").val(),
  					id_area = parseInt($("#group-area").val()),
  					id_		= $("#group-id").val();
					
					if( nombre == undefined || nombre == "" || id_area == undefined || id_area == 0){
						alert("todos los datos son requeridos");
					}else{
						this.request.put('grupos', id_, {nombre: nombre,id_area: id_area } ).subscribe((res)=>{
							alert("cambios realizados con exito");
								this.getGrupos(this._currentPage);
								this.goTo('panel');
						});
					}
  			break;
  		}
  	}
  

  	goToEdit(param:any, view:string, action:string){
  			this._action = action;
  			this._viewActive = view;



  			if ( action == "update" && this._viewActive == "group"){
  				setTimeout(function(){
  					$("#group-id").val(param.id);
  					$("#group-name").val(param.nombre);
					$("#group-area").val(param.id_area);
		  		},0);	
  			}
  			if ( action == "update" && this._viewActive == "area"){
  				setTimeout(function(){
            console.warn(param);
  					$("#area-jefe").val(param.usuario_jefe.nombre).attr("data-id", param.usuario_jefe.id_usuario_jefe);
  					$("#areas-id").val(param.id);
  					$("#areas-name").val(param.nombre);
					$("#areas-city").val(param.id_ciudad);
		  		},0);	
  			}
  		
  	}

}
