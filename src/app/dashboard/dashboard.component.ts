import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	notifyState = false;
  constructor() { }

  ngOnInit() {
  }

  showuserNotify(){
  	this.notifyState = ( this.notifyState == false ) ? true : false;
  }

}
