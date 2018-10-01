import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { AuthGuardianService } from '../services/auth/auth-guardian.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./../css-elements/forms.css','./../tasks/tasks.component.css']
})

export class NewTaskComponent implements OnInit {

	//Arrays
  clients: any[];
	tipesOTS: any[];
	marcas: any[];
	grupos: any[];
	franjas: any[];
	users: any[];

  //ngModels
    _client:any;
    _marca:any;
    _tipeOT:any;
    _titleOT:any;
    _instructions:any;
    _hours:number;
    _minutes:number;
    _startDate:any;
    _endDate:any;
    _linksRelations = new Array();
    _timeZone: any;
    _responsable: string;
    _data:any;

    //alerts
   _alertClass:string;
   _alertText:string;
   _alertState:boolean;


	  constructor(  public request: RequestService, public auth: AuthGuardianService) { 
	  }

    //Funcion para mostrar las alertas
    _alert(state, text){
        this._alertClass = "alert-"+state;
        this._alertText = text;
        this._alertState = true;
    }

    saveOTS(){

      if ( this._client == undefined || this._client == "init"){
              this._alert("danger", "Ingresa un Nombre");
      }

      if( this._marca == undefined || this._marca == "init"){
              this._alert("danger", "Ingresa una marca");
      }

      if( this._tipeOT == undefined || this._tipeOT == "init"){
            this._alert("danger", "Ingresa una marca");
      }


      if ( this._titleOT == undefined || this._titleOT == "" ){
            this._alert("danger", "Ingresa un titulo");
      }

      if ( this._instructions == undefined || this._instructions == "" ){
           this._alert("danger", "Ingresa una instruccion");
      }

      if ( this._hours == undefined ){
           this._alert("danger", "Ingresa una Hora");
      }


      if ( this._startDate == undefined ){
          this._alert("danger", "Ingresa una Fecha de Inicio");
      }

      if ( this._endDate == undefined ){
          this._alert("danger", "Ingresa una Fecha de Final");
      }

      if ( this._responsable == undefined ){
          this._alert("danger", "Ingresa al menos un responsable");
      }

      if ( this._timeZone == undefined ){
           this._alert("danger", "Ingresa una zona Horaria");
      }

      else{
        let links = [];
          $(".link-relacionados").each(function(){
            var value = $(this).val();
                links.push("s");
          });
           this._linksRelations = links;
          //console.error( this._linksRelations );

        this._data = {
             identificador: "OT1",
             id_estado: 1,
             titulo: "pruebas",
             descripcion: "pruebas de OTS1",
             fecha_inicio: "2018-09-25",
             fecha_fin: "2018-09-30",
             id_cliente: 3,
             id_marca: 12,
             id_grupo: 1,
             id_tipo_ot: 4,
             tiempo_asignado: "02:00:00",
             id_usuario_crea: 1,
             id_franja_horaria: 1,
             tiempo_gastado: "10:00:00",
             url_archivos: "files",
             fecha_cierre: "2018-09-30",
             id_usuario_responsable: [1,2,3,4,5],
         }

          this.request.post('ots', this._data ).subscribe((res)=>{
            //console.warn(res);
             //this._alert("success", "Registro Editado Con Exito");
                      //this.getMarcas(this._currentPage);
               
          }); 

      }

      }

    addUrl(){
       var url = $(".link-relacionados:first-child").clone();
       $("#relations-links").append(url);
    }

    removeUrl(){
      var conteo = $(".link-relacionados");
      if ( conteo.length > 1){
        $(".link-relacionados:last-child").remove();
      }else{
        alert("No se puede eliminar");
      }  
    }


	  getClientes(){
  	 	this.request.get('getClients').subscribe((res)=>{
  	 	  	this.clients = res;
			  return res;
		  });
  	}

    getUsuarios(){
       this.request.get('getUsers').subscribe((res)=>{
           this.users = res;
        return res;
      });
    }

  	getTiposOTS(){
  	 	this.request.get('getTypeOts').subscribe((res)=>{
  	 		this.tipesOTS = res;
  	 		//console.warn("tiposots:", this.tipesOTS);
			return res;
		});
  	}

    getFranjasHorarias(){
        this.request.get('getZones').subscribe((res)=>{
           this.franjas = res;
           //console.warn("Franjas:", this.franjas);
          return res;
        });
    }

    selecMarca(event){
      this.getMarcas( $(event.target).val() );
    }

  	getMarcas(id:number){
      	this.request.get('marcas/'+id).subscribe((res)=>{

      	 		let ar = [];
      	 		    ar.push(res)
      	 		  this.marcas = ar;
              this._marca = res.id;
             
    		});
  	}

	 

	  ngOnInit() {
	  	this.getClientes();
	  	this.getTiposOTS();
      this.getUsuarios();
	  	this.getFranjasHorarias();
	  	this.auth.asAdmin();  
	  }

 

}
