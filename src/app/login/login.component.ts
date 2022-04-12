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
            alert('failed');
          }
        },
        (error)=>{
          alert('failed error');
        }
      )
  }
}
