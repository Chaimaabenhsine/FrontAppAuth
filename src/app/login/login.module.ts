import { NgModule } from "@angular/core";
import { LoginComponent } from './login.component';
import { LoginRouteModules } from './login-route.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations:[
    LoginComponent
  ],
  imports:[
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    LoginRouteModules
  ]
})
export class LoginModule{}
