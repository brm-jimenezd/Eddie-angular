import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-ots',
  templateUrl: './ots.component.html',
  styleUrls: ['./../css-elements/forms.css','./ots.component.css', './../css-elements/table.css']
})

export class OtsComponent implements OnInit {
	//Render Page
	_totalPageOts: any = [];
	_allOTS:number;
	_otsCurrentPage: number;
	_tipesOTS: any;

  //variables de los estados de ots
  _statesOts:any;
  _totalStatesOts:number;
  _totalAllStages:any = [];

  //Models Actions
   _tipeOTtitle:string;
   _tipeOTgroup:string;
   _totalGroups:any;
   _currentAction:any;
   _tipeOTid:any;
   _data:any;

   //Stados de Ots
   _otsStatesCurrentPage: number;
   _otsNameState:string;
   _otsStateId:number;

	//Variables globales
	_viewActive:string = "panel";
  _currentPage:number;

  //alerts
   _alertClass:string;
   _alertText:string;
   _alertState:boolean;
  constructor( public request: RequestService) { }

  ngOnInit() {
  		this.getTipeOts(1);
      this.getGrupos(1);
      this.getStates(1);
  }
  //Funcion para mostrar las alertas
    _alert(state, text){
        this._alertClass = "alert-"+state;
        this._alertText = text;
        this._alertState = true;
    }
  //Obtener todos los grupos
  getGrupos(page:number){
          this.request.get('getGroups').subscribe((res)=>{
             this._totalGroups = res;
          });
  }
  //Obtener los estados de Ots
  getStates(page:number){
    this.request.get('estados?page='+page).subscribe((res)=>{
      this._statesOts = res.data;

      this._totalStatesOts = res.total;
      this._otsStatesCurrentPage = res.current_page;
      this._totalAllStages;

          if ( this._totalAllStages.length == 0 ){
               for (var i = 1; i <= parseInt( res.last_page ); i++) {
                     this._totalAllStages.push(i);
               }
             }
        return res;
    });

  }
  //NAVEGAR DENTRO DE LA VISTA
  go(view:string, action?:string, data?:any ){
     this._viewActive = view;
     this._currentAction = (action != "")? action : "";

        if ( action == "update" && view == 'otTipesForm'){
          this._tipeOTid = data.id;
          this._tipeOTtitle = data.tipo;
          this._tipeOTgroup = data.grupo.id;
        }
        else  if ( action == "update" && view == 'otStadeForm'){
            this._otsNameState = data.estado;
            this._otsStateId    = data.id;
        }
        else if ( action == "cancelar" ){
            this._clear();
        }
  }

  //Limipar las variables ngModels
  _clear(){
    this._otsNameState = "";
    this._tipeOTtitle = "";
    this._tipeOTgroup = "init";
  }

  //Obtener los tipos de ots
  getTipeOts(page:number){
  		this.request.get('tiposots?page='+page).subscribe((res)=>{
  	 		this._tipesOTS  = res.data;
  	 		this._allOTS    = res.total;
  	 		this._otsCurrentPage = res.current_page;

          if ( this._totalPageOts.length == 0 ){
  		  	 		for (var i = 1; i <= parseInt(res.last_page); i++) {
  		  	 			this._totalPageOts.push(i);
  		  	 		}
  		  	 	}
  			return res;
		  });
  }

  //Guardar los tipos de OTS
  saveTipes(){
         if (  this._tipeOTtitle == undefined || this._tipeOTtitle == "" ){
                 this._alert("danger", "Debes ingresa un titulo");
              return false;
         }

         if ( this._tipeOTgroup == undefined || this._tipeOTgroup == "" ){
                this._alert("danger", "Debes ingresa un grupo");
             return false;
         }else{
            
             this._data = {
               tipo: this._tipeOTtitle,
               id_grupo: this._tipeOTgroup
             }

             switch (this._currentAction) {
                case "update":
                   this.request.put('tiposots', this._tipeOTid, this._data).subscribe((res)=>{
                      this._alert("success", "Elemento cambiado");
                      this.getTipeOts(this._otsCurrentPage);
                    });
                break;
               
               case "create":
                   this.request.post('tiposots', this._data).subscribe((res)=>{
                     this._alert("success", "Elemento agregado");
                      this.getTipeOts(1);
                    });
                break;
             }
             this.go('panel');
             this._data = "";
         }
  }//fin saveTipes()

  //Funcion compartida para eliminar Tipos y estados de OTS
  Delete(from:string, data:any){
    console.warn(data);
    switch (from) {
      case "tipes":
        //console.info("Eliminando Tipos");
          this.request.delete("tiposots", data).subscribe((res)=>{
            this._alert("success", "Registro Eliminado Con Exito");
                this.getTipeOts(this._currentPage);
                this.go('panel');
          });
      break;
      
      case "states":
      //console.info("Eliminando estados");
          this.request.delete("estados", data).subscribe((res)=>{
            this._alert("success", "Registro Eliminado Con Exito");
                this.getStates(this._currentPage);
                this.go('panel');
          });
      break;
    }
  }

  //Guardar los estados de las Ots
  saveStatesOTS(){

       if (  this._otsNameState  == undefined || this._otsNameState  == "" ){
                 this._alert("danger", "Debes ingresar un titulo");
            return false;
         }else{

            this._data = {
               estado: this._otsNameState,
             }

           switch (this._currentAction) {
                case "update":
                  this.request.put('estados', this._otsStateId, this._data).subscribe((res)=>{
                    console.info(this._otsStateId);
                      this._alert("success", "Elemento cambiado");
                      this.getStates(this._otsStatesCurrentPage);
                    });
                break;
               
               case "create":
                   this.request.post('estados', this._data).subscribe((res)=>{
                     this._alert("success", "Elemento agregado");
                      this.getStates(1);
                    });
                break;
             }
              this.go('panel');
              this._data = "";
         }
         this._otsNameState = "";
  }
}
