import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { switchMap, map, flatMap, take } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthTokenInterceptors implements HttpInterceptor {
  jwtHelper = new JwtHelperService();
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes("http://localhost:8082/api/auth/login")) {
      return next.handle(req);
    }else {
      const token = localStorage.getItem("access_token");
      const request = req.clone({setHeaders: {Authorization: `Bearer ${token}`}});
      console.log(request);
      return next.handle(request);
    }
  }
}
