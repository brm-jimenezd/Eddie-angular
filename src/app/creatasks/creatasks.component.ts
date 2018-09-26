import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-creatasks',
  templateUrl: './creatasks.component.html',
  styleUrls: ['./../index/app.component.css']
})
export class CreatasksComponent implements OnInit {
	clients: any[];
	tipesOTS: any[];
	marcas: any[];
	grupos: any[];
	franjas: any[];
	users: any[];

	  constructor(  public request: RequestService ) { 
	  }


	getClientes(){
  	 	this.request.get('clientes').subscribe((res)=>{
  	 		this.clients = res;
  	 		console.warn("cliente:", this.clients);
			return res;
		});
  	}

  	getTiposOTS(){
  	 	this.request.get('tiposots').subscribe((res)=>{
  	 		this.tipesOTS = res;
  	 		console.warn("tiposots:", this.tipesOTS);
			return res;
		});
  	}

  	getGrupos(){
  	 	this.request.get('grupos').subscribe((res)=>{
  	 		this.grupos = res;
  	 		console.warn("Grupos:", this.grupos);
			return res;
		});
  	}

  	getMarcas(id:number){
  		//console.warn(id);
  		$('select#sel-marca option[value="init"]').attr("selected",true);
  	 	this.request.get('marcas/'+id).subscribe((res)=>{
  	 		let ar = [];
  	 		ar.push(res)
  	 		console.warn(ar);
  	 		this.marcas = ar;
			return res;
		});
  	}

  	getResponsable(){
  		this.request.get('usuarios').subscribe((res)=>{
  	 		  this.users = res;
  	 		  console.warn("users:", this.users);
			return res;
		  });
  	}

	getFranjasHorarias(){
  		this.request.get('franjas').subscribe((res)=>{
  	 		this.franjas = res;
  	 		console.warn("Franjas:", this.franjas);
			return res;
		});
  	}

  	selectCliente(event){
  		var value = $(event.target).val(),
  			Marcas = $(event.target).find(':selected').attr('id'),
  			id_ = Marcas.replace( "cliente-option-" , " ").trim();

			this.getMarcas(id_)
  	}
  


	  ngOnInit() {
	  	this.getClientes();
	  	this.getTiposOTS();
	  	this.getGrupos();
	  	this.getFranjasHorarias();
	  	this.getResponsable();
	  }

 

}
