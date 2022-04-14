import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './service/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthGuard} from "./guards/auth.guard";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthTokenInterceptors} from "./interceptors/auth.token.interceptor";


@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule
  ],
  providers: [AuthService,AuthGuard,{provide: HTTP_INTERCEPTORS,useClass:AuthTokenInterceptors,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
