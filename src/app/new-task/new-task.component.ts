import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { AuthGuardianService } from '../services/auth/auth-guardian.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css','./../css-elements/forms.css','./../tasks/tasks.component.css']
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
    _timeZone: any;
    _responsable: string;
    _data:any;
    _urls:string = "";
    _urlsValidationEnd:boolean;

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
    //Valida el formato de la url
    _ValidUrl(url:any){
      var pattern = /^(http|https)\:\/\/[a-z0-9\.-]+\.[a-z]{2,4}/gi;
        if( url.match(pattern) )
            return true;
        else
            return false;
    }
    //Retorna alertas cuando los valores de la url son invalidos
    checkingUrlsFields(isvalid:boolean, type:string, val:string, index?:number ){
        //console.info("Entrado a checkingUrlsFields");
        let url_element = $(".link-relacionados"); 
        let url_files_total = url_element.length;
        let separator:string = "ø";

        //console.warn("isvalid: ", isvalid);
        //console.info("type: ", type);
        //console.warn("val: ", val);
        //console.info("index: ", index);

          if ( isvalid == false ){
              this._urlsValidationEnd = false;
              this._alert("danger", "Ingresa una url Valida");
              return false;
          }else{
              this._urlsValidationEnd = true;
              this._urls += val;
              if( type == "multiple" ){
                if ( index+1 != url_files_total ){
                      this._urls += separator;
                  }
              }
              return;
          }
      }

    //Regresa el formato para las urls 
    _formatToUrls(){
      this._urls = "";
      let url_element = $(".link-relacionados"); 
      let _this = this;

        //Anidando multiples Urls
        if ( url_element.length > 1 ){
          //console.info("validar _formatToUrls dos urls");
              url_element.each(function(ind){
                let val = $(this).val().trim();
                let validUrl = _this._ValidUrl( val );
                    _this.checkingUrlsFields(validUrl, "multiple", val, ind);
              });
        //Anindando una sola Url
        }else{
           //console.info("validar _formatToUrls una url");
                let value = url_element.val().trim();
                let validUrl = _this._ValidUrl( value );
                    this.checkingUrlsFields(validUrl, "normal", value);
        }
    }

    saveOTS(){
      if ( this._client == undefined || this._client == "init"){
              this._alert("danger", "Ingresa Un Cliente");
              return false;
      }

      if( this._marca == undefined || this._marca == "init"){
              this._alert("danger", "Ingresa Una Marca");
              return false;
      }

      if( this._tipeOT == undefined || this._tipeOT == "init"){
            this._alert("danger", "Ingresa Un tipo de OT");
            return false;
      }


      if ( this._titleOT == undefined || this._titleOT == "" ){
            this._alert("danger", "Ingresa un titulo");
            return false;
      }

      if ( this._instructions == undefined || this._instructions == "" ){
           this._alert("danger", "Ingresa una instruccion");
           return false;
      }

      if ( this._hours == undefined || this._hours > 24){
           this._alert("danger", "Ingresa una Hora Válida");
           return false;
      }

      if ( this._minutes == undefined || this._minutes > 59){
            this._alert("danger", "Ingresa Minutos Válidos");
            return false;
      }

      if ( this._startDate == undefined ){
          this._alert("danger", "Ingresa una Fecha de Inicio");
          return false;
      }

      if ( this._endDate == undefined ){
          this._alert("danger", "Ingresa una Fecha de Final");
          return false;
      }

       if ( this._startDate > this._endDate){
           this._alert("danger", "La fecha de Inicio: (<b>"+this._startDate+"</b>) es mayor a la de finalización (<b>"+this._endDate+"</b>)");
            return false;
        }


      if ( this._responsable == undefined ){
          this._alert("danger", "Ingresa al menos un responsable");
      }

      if ( this._timeZone == undefined ){
           this._alert("danger", "Ingresa una zona Horaria");
      }

      else{ 
        console.info(this._startDate);
        console.info(this._endDate);

       

        this._formatToUrls();
        if ( this._urlsValidationEnd == true ){
              this._data = {
                    url:this._urls,
                    id_usuarios_responsables:"11ø222ø33",
                    identificador:"OTDuv2",
                    fecha:"2018-09-28 15:25:04",
                    id_estado:"1",
                    titulo: this._titleOT,
                    descripcion:this._instructions,
                    fecha_inicio: this._startDate,
                    fecha_fin: this._endDate,
                    id_cliente: this._client,
                    id_marca: this._marca,
                    id_grupo: "1",
                    id_tipo_ot: this._tipeOT,
                    tiempo_asignado: this._hours+":00:00",
                    id_usuario_crea:"1"
              }

        /* this.request.post('ots', this._data ).subscribe((res)=>{
            //console.warn(res);
             //this._alert("success", "Registro Editado Con Exito");
                      //this.getMarcas(this._currentPage);
               
          });*/
       }
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
