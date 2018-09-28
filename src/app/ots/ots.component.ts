import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';


@Component({
  selector: 'app-ots',
  templateUrl: './ots.component.html',
  styleUrls: ['./../index/app.component.css']
})
export class OtsComponent implements OnInit {
	//Render Page
	_totalPageOts: any = [];
	_allOTS:number;
	_otsCurrentPage: number;
	_tipesOTS: any;

	//Variables globales
	_viewActive:string = "panel";
  constructor( public request: RequestService) { }

  ngOnInit() {
  		this.getTipeOts(1);
  }

  getTipeOts(page:number){
  		this.request.get('tiposots?page='+page).subscribe((res)=>{
  			console.warn(res);
  	 		this._tipesOTS  = res.data;
  	 		this._allOTS    = res.total;
  	 		this._otsCurrentPage = res.current_page;

  	 		console.warn(this._otsCurrentPage);

          if ( this._totalPageOts.length == 0 ){
  		  	 		for (var i = 1; i <= parseInt(res.last_page); i++) {
  		  	 			this._totalPageOts.push(i);
  		  	 		}
  		  	 	}
  			return res;
		  });
  }

}
