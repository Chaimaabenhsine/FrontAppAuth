import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router";

@Injectable()
export class AuthService {
  userInfo = new BehaviorSubject(null);
  jwtHelper = new JwtHelperService();
  token:any;
  constructor(private http: HttpClient) {
  }

  loadUserInfo() {
    let userdata = this.userInfo.getValue();
    if (!userdata) {
      const access_token = localStorage.getItem('access_token');
      if (access_token) {
        userdata = this.jwtHelper.decodeToken(access_token);
        this.userInfo.next(userdata);
      }
    }
  }


  userLogin(login: any): Observable<boolean> {
    if (login && login.username && login.password) {
      return this.http.post("http://localhost:8082/api/auth/login", login).pipe(
        map((data: any) => {
          if (!data) {
            return false;
          }
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          const decodedUser = this.jwtHelper.decodeToken(data.access_token);
          localStorage.setItem('roles',decodedUser.roles);
          localStorage.setItem('expiration', decodedUser.exp);
          this.userInfo.next(decodedUser);
          return true;
        })
      );
    }
    return of(false);
  }

  getTodos():Observable<any>{
    return this.http.get("http://localhost:8082/api/users",{ withCredentials: true });
  }


   callRefershToken(payload:any){
    return this.http.post("http://localhost:8082/api/auth/refreshToken",payload);
  }
}
