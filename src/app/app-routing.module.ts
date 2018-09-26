import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TasksComponent } from './tasks/tasks.component';
import { CreatasksComponent } from './creatasks/creatasks.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { NotFoundComponent } from './not-found/not-found.component';

//Edición de super admin
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { UsersComponent } from './users/users.component';
import { UsersListComponent } from './users/users-list.component';
import { MarcasComponent } from './marcas/marcas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { PlacejobComponent } from './placejob/placejob.component';
import { OtsComponent } from './ots/ots.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,
  	children:[
  		  { path: 'tasks', component: TasksComponent },
        { path: 'detail/:id', component: DetailComponent },
        { path: 'create', component: CreatasksComponent },
        { path: 'edit/:id', component: EditComponent },
        { path: 'AdminEdit/:id/:adminId', component: AdminEditComponent },
        { path: 'users', component: UsersComponent },
        { path: 'users-list', component: UsersListComponent },
        { path: 'brands', component: MarcasComponent },
        { path: 'clients', component: ClientesComponent },
        { path: 'company', component: PlacejobComponent },
        { path: 'orders', component: OtsComponent },
        { path: '**', component: NotFoundComponent }
  	   ]
   },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent  }//404 not found add component: PageNotFoundComponent
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
