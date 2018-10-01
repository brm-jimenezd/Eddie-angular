import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TasksComponent } from './tasks/tasks.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { DetailComponent } from './detail/detail.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { NotFoundComponent } from './not-found/not-found.component';

//Edición de super admin
import { UsersComponent } from './users/users.component';
import { MarcasComponent } from './marcas/marcas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CompanyComponent } from './company/company.component';
import { OtsComponent } from './ots/ots.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,
  	children:[
  		  { path: 'tasks', component: TasksComponent },
        { path: 'detail/:id', component: DetailComponent },
        { path: 'create', component: NewTaskComponent },
        { path: 'edit-task/:id', component: EditTaskComponent },
        //{ path: 'editTask/:id/:adminId', component: AdminEditComponent },
        { path: 'users', component: UsersComponent },
        { path: 'brands', component: MarcasComponent },
        { path: 'clients', component: ClientesComponent },
        { path: 'company', component: CompanyComponent },
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
