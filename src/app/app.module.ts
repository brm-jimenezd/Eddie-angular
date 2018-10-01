import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { RequestService } from './services/request.service';

import { AppComponent } from './index/app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TasksComponent } from './tasks/tasks.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { DetailComponent } from './detail/detail.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { UsersComponent } from './users/users.component';
import { MarcasComponent } from './marcas/marcas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CompanyComponent } from './company/company.component';
import { OtsComponent } from './ots/ots.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TasksComponent,
    NewTaskComponent,
    DetailComponent,
    EditTaskComponent,
    UsersComponent,
    MarcasComponent,
    ClientesComponent,
    CompanyComponent,
    OtsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule
  ],
  providers: [ RequestService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
