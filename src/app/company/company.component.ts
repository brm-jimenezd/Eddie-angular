import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';

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
	_grouptName: string;
	_groupArea: any;
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

  //alerts
   _alertClass:string;
   _alertText:string;
   _alertState:boolean;


  constructor( public request: RequestService ) { }

  //llamar los datos desde el inicio de la aplicación
  ngOnInit() {
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
    //Cuando se ha guardado una area o perfil, activar su vista en el panel
    showCurrentPanel(id){
      $("ul.tabs-admin li a").removeClass("active");
      $("ul.tabs-admin li a[href='#"+id+"']").addClass("active");
      $("div.company-admin-panel .table-admin").removeClass("active").removeClass("show");
      $("div.company-admin-panel .table-admin#"+id).addClass("active show");
    }

    //Areas
    data:any;
    CRUDareas(){
      //Datos para salvar 
      var nombre    = $("#areas-name").val(),
          id_ciudad = $("#areas-city").val(),
          id_       = $("#areas-id").val(),
          id_usuario_jefe = $("#area-jefe").val(),
          ErrorStyle = "2px solid #800000";;
          
      //validaciones del formulario
         if ( nombre == "" || nombre == undefined) {
              this._alert("danger", "El campo nombre es requerido");
            $("#areas-name").css("border-bottom", ErrorStyle);
            return false;
         }

         if ( id_ciudad == "init" || id_ciudad == undefined) {
              this._alert("danger", "La ciudad es requerida");
            $("#areas-city").css("border-bottom", ErrorStyle);
            return false;
         }

        if ( id_usuario_jefe == "init" || id_usuario_jefe == undefined) {
               this._alert("danger", "El Nombre del jefe es requerido");
            $("#area-jefe").css("border-bottom", ErrorStyle);
            return false;
        }
            
        else{

           switch (this._action) {
              case "update":
               
                   this.request.put('areas', id_, { nombre: nombre ,id_ciudad: 1,id_usuario_jefe:id_usuario_jefe } ).subscribe((res)=>{
                       this._alert("success", "Registro Agregado Con Exito");
                         this.getAreas(this._currentPageAreas);
                       this.goTo('panel');
                   }); 
              break;

              case "create":
                  this.data = { 
                    nombre: nombre,
                    id_ciudad: 1,
                    id_usuario_jefe:id_usuario_jefe
                 }
                       this.request.post('areas', this.data ).subscribe((res)=>{
                              this._alert("success", "Registro Agregado Con Exito");
                              this.getAreas(this._currentPageAreas);
                            this.goTo('panel');
                        });
                    break;
                  }

                setTimeout(function(){
                   this._this.showCurrentPanel("AREAS");
                    $("#row-areas-"+id_).css("animation-name","setThisActive");
                },800);
                this.data = "";
      }
    }
    //:::Fin areas


  	CRUDgrupos(){
      var Name = $("#group-name"),
          Area = $("#group-area"),
          ErrorStyle = "2px solid #800000";

  		switch (this._action) {
  			case "create":
          Name.attr("style","");
          Area.attr("style","");

          if ( this._grouptName == "" || this._grouptName == undefined ){
  					    this._alert("danger", "Por favor ingresa un Nombre");
                Name.css("border-bottom", ErrorStyle);
  				}
          else if ( this._groupArea == "" || this._groupArea == undefined  || this._groupArea == "init"){
                this._alert("danger", "Por favor ingresa una Area");
                Area.css("border-bottom", ErrorStyle);
          }

          else{

            this.data = {nombre:this._grouptName,id_area: this._groupArea};
  						this.request.post('grupos', this.data ).subscribe((res)=>{
		  	 			   this._alert("success", "Registro Agregado Con Exito");
  								this.getGrupos(1);
  								this.goTo('panel');
						});
  				}
  			break;

  			case "update":
  				var nombre  = $("#group-name").val(),
  					  id_area = $("#group-area").val(),
  					  id_		  = $("#group-id").val();

       
           if ( nombre == "" || nombre == undefined ){
                this._alert("danger", "Por favor ingresa un Nombre");
                Name.css("border-bottom", ErrorStyle);
            }
            else if ( id_area == "" || id_area == undefined  || id_area == "init"){
                this._alert("danger", "Por favor ingresa una Area");
                Area.css("border-bottom", ErrorStyle);
            }else{
                  this.request.put('grupos', id_, {nombre: nombre,id_area: id_area } ).subscribe((res)=>{
                   this._alert("success", "Registro Editado Con Exito")
                      this.getGrupos(this._currentPage);
                      this.goTo('panel');
                     setTimeout(function(){
                        $("#row-group-"+id_).css("animation-name","setThisActive");
                     },200); 
                  });
            }
  			break;
  		}
       this.data = "";
  	}

    CRUDperfiles(){
      var nombre   = $("#perfiles-names").val(),
          id_grupo = $("#perfiles-grupos").val(),
          id_      = $("#perfiles-id").val();

      if ( nombre == undefined || nombre == ''){
          this._alert("danger", "Por favor ingresa un nombre")
      }

       if ( id_grupo == undefined || id_grupo == 'init'){
          this._alert("danger", "Por favor ingresa un grupo")
      }

      else{
          switch (this._action) {
            case "create":
              var nombre  = $("#perfiles-names").val(),
                  id_grupo = $("#perfiles-grupos").val();
                  //id_    = $("#group-id").val();
                this.data = { nombre:nombre , id_grupo: id_grupo};

                this.request.post('perfiles', this.data ).subscribe((res)=>{
                     this._alert("success", "Perfil Agregado Con Exito")
                    this.getPerfiles(1);
                    this.goTo('panel');
                });
            break;

            case "update":
                this.data = { nombre:nombre , id_grupo: id_grupo};

                this.request.put('perfiles', id_, this.data ).subscribe((res)=>{
                  this._alert("success", "Perfil Editado Con Exito");
                    this.getPerfiles(this._currentPagePerfiles);
                    this.goTo('panel');
                });
            break;
          }
           setTimeout(function(){
              this._this.showCurrentPanel("PERFILES");
              console.warn("#row-perfiles-"+id_);
               $("#row-perfiles-"+id_).css("animation-name","setThisActive");
           },800);

           this.data = "";

      }  
    }

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
  				setTimeout(function(){
  					$("#group-id").val(param.id);
  					$("#group-name").val(param.nombre);
					  $("#group-area").val(param.id_area);
		  		},0);	
  			}
  			if ( action == "update" && this._viewActive == "area"){
  				setTimeout(function(){
            var city = $("#areas-city")
                city.val(param.id_ciudad);
                city.find(':selected').text( param.ciudad.nombre );
             if ( param.usuario_jefe != null ){
                 $("#area-jefe").val(param.usuario_jefe.nombre).attr("data-id", param.usuario_jefe.id_usuario_jefe);
             }
  					$("#areas-id").val(param.id);
  					$("#areas-name").val(param.nombre);
		  		},0);	
  			}
        if ( action == "update" && this._viewActive == "perfil"){
          setTimeout(function(){
            //console.warn(param);
            var city = $("#perfiles-grupos")
                city.val(param.id_grupo);
                city.find(':selected').text( param.grupo.nombre );

            $("#perfiles-names").val(param.nombre);
            $("#perfiles-id").val(param.id);
          },0);  
        }
  		
  	}

}
