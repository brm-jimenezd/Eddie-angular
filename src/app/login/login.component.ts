import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  		user:any = JSON.stringify({  	
	  			id: 5,
	  			token: "1728366781",
	  			name: "Alexis",
          lastName: "Valencia",
	  			role: "Admin" 
	  		});


  constructor( ) { }

  ngOnInit() {
  	localStorage.setItem("eddie-session", this.user );
  }

}
