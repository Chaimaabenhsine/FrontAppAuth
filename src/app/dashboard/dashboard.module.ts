import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {UserService} from "../service/user.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
  imports:[
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations:[
    DashboardComponent
  ],
  providers:[
    UserService
  ]
})
export class DashboardModule {}
