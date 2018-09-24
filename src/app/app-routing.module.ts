import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TasksComponent } from './tasks/tasks.component';
import { CreatasksComponent } from './creatasks/creatasks.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
//Edición de super admin
import { AdminEditComponent } from './admin-edit/admin-edit.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tablero', component: DashboardComponent,
  	children:[
  		  { path: 'tasks', component: TasksComponent },
        { path: 'detail/:id', component: DetailComponent },
        { path: 'create', component: CreatasksComponent },
        { path: 'edit/:id', component: EditComponent },
        { path: 'AdminEdit/:id/:adminId', component: AdminEditComponent }
  	   ]
   },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/tablero/task', pathMatch: 'full' }//404 not found add component: PageNotFoundComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
