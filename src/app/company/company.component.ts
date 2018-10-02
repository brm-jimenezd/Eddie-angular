import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { AuthGuardianService } from '../services/auth/auth-guardian.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./../css-elements/forms.css','./company.component.css', './../css-elements/table.css']
})
export class CompanyComponent implements OnInit {
	// _nombre =Nomenclatura para vairables globales

  //arrays y variables que cambian constantemente en la aplicación 
  _cities:any;
	_areas:any;
	_grupos:any;
	_usuarios:any;
	_perfiles:any;
	_viewActive:string = "panel";
	_action: string = "create";
  _this:any = this;

	//Group form
	_totalPage: any = [];
	_currentPage: number;

	_data: any;
	_totalGrupos: number;

	//Areas form
	_totalPageAreas: any = [];
	_currentPageAreas: number;
	_totalAreas: number;

  //Perfiles form
  _totalPageAPerfiles: any = [];
  _currentPagePerfiles: number;
  _totalPerfiles: number;


  //Models formulario Grupos
  _grouptName: string;
  _groupId: number;
  _groupArea: any;

  //Models formulario Areas
  _arearId: number;
  _areaNombre: string;
  _areaCiudad: string;
  _areaJefe: string;

  //Models formulario perfiles
  _pefilesId: number;
  _pefilesName: string;
  _pefilesGrupos: string;

  //alerts
   _alertClass:string;
   _alertText:string;
   _alertState:boolean;


  constructor( public request: RequestService, public auth: AuthGuardianService ) { }

  //llamar los datos desde el inicio de la aplicación
  ngOnInit() {
      this.auth.asAdmin();
    	this.getGrupos(1);
      this.getUsuarios();
      this.getCiuddes();

      this.getAreas(1);//ARREGLAR!!!
      this.getPerfiles(1);//ARREGLAR!!!
	  }

   //cargar los datos cuando la vista este activa y solo una vez
  loadDate(view){
      switch (view) {
        case "areas":
        if ( this._areas == undefined ){ this.getAreas(1);  }
        break;

        case "perfiles":
        if ( this._perfiles == undefined ){ this.getPerfiles(1);  }
        break;
      }
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
	goTo(view:any, action?:string){  
	  	this._viewActive = view;
      this._action = action;    

      if (action != undefined ){
         this._alertState = false;
      }
	 }

   //llamadas al API
   getCiuddes(){
      this.request.get('ciudades').subscribe((res)=>{
             this._cities = res.data;
       });
   }

   getAreas(page:number){
  		this._currentPageAreas = page;
  	 	this.request.get('areas?page='+page).subscribe((res)=>{
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
    getPerfiles(page:number){
    	 	this.request.get('perfiles?page='+page).subscribe((res)=>{
    	 		this._perfiles = res.data;
            this._totalPerfiles = res.total;
            this._currentPagePerfiles = res.current_page;
          
            if (this._totalPageAPerfiles.length == 0){
                 for (var i = 1; i <= parseInt(res.last_page); i++) {
                   this._totalPageAPerfiles.push(i);
                 }
            }
  			  return res;
  		  });
  	}
    getUsuarios(){
         this.request.get('usuarios').subscribe((res)=>{
           this._usuarios = res.data;
          return res;
        });
    }
    //Función de prueba para el autocomplete de usuarios
    searchUser(val:any){
      console.warn(val, "preparando autocomplete");
    }
    //GUARDAR Y ACTUALIZAR LAS AREAS
    CRUDareas(){
    //Datos para salvar 
     var  ErrorStyle = "2px solid #800000";
          
      //validaciones del formulario
         if ( this._areaNombre == "" || this._areaNombre == undefined) {
              this._alert("danger", "El campo nombre es requerido");
            $("#areas-name").css("border-bottom", ErrorStyle);
            return false;
         }

         if ( this._areaCiudad == "init" || this._areaCiudad == undefined) {
              this._alert("danger", "La ciudad es requerida");
            $("#areas-city").css("border-bottom", ErrorStyle);
            return false;
         }

        if ( this._areaJefe == "init" || this._areaJefe == undefined) {
               this._alert("danger", "El Nombre del jefe es requerido");
            $("#area-jefe").css("border-bottom", ErrorStyle);
            return false;
        }
            
        else{ 
          $("#areas-name").attr("style","");
          $("#areas-city").attr("style","");
          $("#area-jefe").attr("style","");

            this._data = { 
                nombre: this._areaNombre,
                id_ciudad: this._areaCiudad,
                id_usuario_jefe: this._areaJefe 
            }

           switch (this._action) {
              case "update":
                   this.request.put('areas', this._arearId, this._data ).subscribe((res)=>{
                      this._alert("success", "Registro Cambiado Con Exito");
                      this.getAreas(this._currentPageAreas);
                      this.goTo('panel');
                   }); 
              break;
              case "create":
                    this.request.post('areas', this._data ).subscribe((res)=>{
                        this._alert("success", "Registro Agregado Con Exito");
                        this.getAreas(this._currentPageAreas);
                        this.goTo('panel');
                    });
              break;
                  }
          this._data = "";
      }
    }
    //:::Fin areas

    //GUARDAR Y EDITAR GRUPOS.
  	CRUDgrupos(){
      var Name = $("#group-name"),
          Area = $("#group-area"),
          ErrorStyle = "2px solid #800000";  

      if ( this._grouptName == "" || this._grouptName == undefined ){
          this._alert("danger", "Por favor ingresa un Nombre");
            Name.css("border-bottom", ErrorStyle);
      }

      else if ( this._groupArea == "" || this._groupArea == undefined  || this._groupArea == "init"){
            this._alert("danger", "Por favor ingresa una Area");
                Area.css("border-bottom", ErrorStyle);
        }else{
            Name.attr("style","");
            Area.attr("style","");
            
            this._data = { nombre:this._grouptName, id_area: this._groupArea };
              switch (this._action) {
                  case "create":
                      this.request.post('grupos', this._data ).subscribe((res)=>{
                              this._alert("success", "Registro Agregado Con Exito");
                              this.getGrupos(1);
                              this.goTo('panel');
                      });
                    break;

                    case "update":
                        this.request.put('grupos', this._groupId, this._data ).subscribe((res)=>{
                            this._alert("success", "Registro Editado Con Exito")
                            this.getGrupos(this._currentPage);
                            this.goTo('panel');
                        });
                  break;
              }
          this._data = "";
        }
  	}

    //GUARDAR Y EDITAR PERFILES.
    CRUDperfiles(){
     if ( this._pefilesName == undefined || this._pefilesName == ''){
          this._alert("danger", "Por favor ingresa un nombre");
      }

       if ( this._pefilesGrupos == undefined || this._pefilesGrupos == 'init'){
          this._alert("danger", "Por favor ingresa un grupo");
      }
      else{
         this._data = { nombre:this._pefilesName , id_grupo: this._pefilesGrupos };
          switch (this._action) {
            case "create":
                this.request.post('perfiles', this._data ).subscribe((res)=>{
                     this._alert("success", "Perfil Agregado Con Exito")
                    this.getPerfiles(1);
                    this.goTo('panel');
                });
            break;
            case "update":
                this.request.put('perfiles', this._pefilesId, this._data ).subscribe((res)=>{
                  this._alert("success", "Perfil Editado Con Exito");
                    this.getPerfiles(this._currentPagePerfiles);
                    this.goTo('panel');
                });
            break;
          }
          this._data = "";
      } 
    }
    //ELIMINAR PERFILES, ARES Y GRUPOS
    delete(param:any, from:string){
        this.request.delete(from, param).subscribe((res)=>{
                switch (from) {
                  case "grupos":
                     console.warn("Actualizamos los grupos");
                      this.getGrupos(this._currentPage);
                   break;

                   case "areas":
                      this.getAreas(this._currentPageAreas);
                   break;

                   case "perfiless":
                     this.getPerfiles(this._currentPagePerfiles);
                    break;
                }
                this.goTo('panel');
          });
    }
    //PASAR PARAMETROS CUANDO SE EDITA
  	goToEdit(param:any, view:string, action:string, identy?:any){
  			this._action = action;
  			this._viewActive = view;

  			if ( action == "update" && this._viewActive == "group"){
          this._grouptName = param.nombre;
          this._groupId    = param.id;
          this._groupArea  = param.id_area;
  			}
  			if ( action == "update" && this._viewActive == "area"){
          this._arearId    = param.id;
          this._areaNombre = param.nombre;
          this._areaCiudad = param.id_ciudad;
          this._areaJefe   = param.id_usuario_jefe;
  			}
        if ( action == "update" && this._viewActive == "perfil"){
          this._pefilesId     = param.id;
          this._pefilesName   = param.nombre;
          this._pefilesGrupos = param.id_grupo;
            //console.warn("Buscame: ", param); 
        }
  		
  	}

}
