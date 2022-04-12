import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService
{
  constructor(private http:HttpClient){}
  getTodos(){
    return this.http.get("http://localhost:8082/api/users/all");
  }
}
