import { Component, OnInit } from '@angular/core';
import { AuthGuardianService } from '../services/auth/auth-guardian.service';

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
  _panelAdmin:boolean = false;
  constructor( public auth:AuthGuardianService ) { }

  ngOnInit() {
    this.showAdminPanel = true;
    this.auth.session();
    this._panelAdmin = this.auth.isAdmin;
  }

  logout(){
    this.auth.logout();
      //window.location.href = "/login";

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


  showAdminPanel: boolean = false;
}
