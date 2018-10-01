import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthGuardianService } from '../services/auth/auth-guardian.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
   constructor(  private route: ActivatedRoute, public auth: AuthGuardianService) { }



  ngOnInit() {
  	 const id = this.route.snapshot.paramMap.get('id');
      this.auth.asAdmin();
  }
  
}
