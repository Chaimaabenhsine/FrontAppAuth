import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from "rxjs";

@Injectable()
export class UserService
{
  constructor(private http:HttpClient){}
  getTodos(){
    return this.http.get("http://localhost:8082/api/users");
  }
  getProjects()
  {
    return this.http.get("http://localhost:8082/api/projet");
  }
  postProject(projetForm: any)
  {
    return this.http.post("http://localhost:8082/api/projet", projetForm)
  }

  deleteProject(id: number):Observable<{}>{
    return this.http.delete(`http://localhost:8082/api/projet/${id}`)
      .pipe(catchError(this.handleError));
  }
  private handleError(httpError: HttpErrorResponse) {
    if (httpError.error instanceof ErrorEvent) {
      console.error('An error occurred:', httpError.error.message);
    } else {
      console.error(
        `Backend returned code ${httpError.status}, ` +
        `body was: ${httpError.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
