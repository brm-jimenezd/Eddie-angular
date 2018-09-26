import { Component, OnInit } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
	notifyState = false;
  _panelstate = false;
  _pageName:string = "dashboard";
  constructor() { }

  ngOnInit() {
    this.showAdminPanel = true;
  }
  adminPanel(){
    this._panelstate = ( this._panelstate == false ) ? true : false;

  }
  showuserNotify(){
  	this.notifyState = ( this.notifyState == false ) ? true : false;
  }
  selectedItem(event){
    var this_ = $(event.target);
      $(".admin-actions ul li").removeClass("active");
      this_.parent("a").parent("li").addClass("active")
  }

 
  /*$("body").on("click", ".admin-actions ul li", function(){
    console.warn("donamit");
  });*/

  showAdminPanel: boolean = false;
}
