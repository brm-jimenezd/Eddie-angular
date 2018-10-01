import { Component, OnInit } from '@angular/core';
import { AuthGuardianService } from '../services/auth/auth-guardian.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./../index/app.component.css']
})
export class UsersComponent implements OnInit {

  constructor( public auth: AuthGuardianService ) { }

  ngOnInit() {
  		this.auth.asAdmin();
  }

}
