import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardianService {
	user:any = JSON.parse( localStorage.getItem("eddie-session") );
	isAdmin:boolean = false;
  constructor(  private routes:Router ) { }

  session(){
		//console.warn(this.user);
      if ( this.user !== null ){
          if ( this.user.name === null && this.user.token === null ){
            	this.routes.navigate(['login']);
          }else if ( this.user.role == "Admin" ){
          		this.isAdmin = true;
          }
      }else{
            this.routes.navigate(['login']);
      }
  }

  asAdmin(){
  	console.warn("relajate, si sirve");
  	if ( this.user.role !== "Admin" ){
  	 	console.warn("you can't enter");
  	 	  this.routes.navigate(['dashboard/tasks']);
  	 }
  }

  logout(){
    localStorage.clear();
    this.routes.navigate(['login']);
  }
   	
}
