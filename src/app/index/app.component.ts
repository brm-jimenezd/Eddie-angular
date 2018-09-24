import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Eddie';
  notifyState:boolean = false;

  showuserNotify(){
  	this.notifyState = ( this.notifyState == false) ? true : false;
  }

}
