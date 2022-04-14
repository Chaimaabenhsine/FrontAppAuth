import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../service/auth.service";
@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = {
    username: '',
    password: '',
  };
  err:number=0;
  error:number=0;

  ngOnInit(): void {
  }

  constructor(private authService: AuthService,private router:Router) {
  }


  userLogin() {
    this.authService.userLogin(this.loginForm)
      .subscribe(
        (value) => {
          if(value){
            this.router.navigate(["/dashboard"]);
          }else{
            alert("empty data");
          }
        },
        (error)=>{
          this.err=1;
          console.log(error.response);
        }
      )
  }
}
