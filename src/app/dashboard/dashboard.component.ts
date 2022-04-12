import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";

@Component({
  templateUrl:'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  userName: string = ''
  users=[];

  constructor(private authService: AuthService,private userService:UserService,private router:Router) {
  }
  user={
    username:'',
    id:''
};


  ngOnInit(): void {
    this.authService.userInfo.subscribe(value => {
      if (value) {
        this.user.id = value['id'];
        this.user.username = value['username'];
      }
    })
    //this.loadUsers();
  }

  loadUsers(){
    this.authService.getTodos()
      .subscribe(
        (value) => {
          this.users = value;
        },
        (error) => {
          console.log('failted to load todos')
        }
      )
  }

  logout():void
  {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('roles');
    localStorage.removeItem('expiration');
    console.log("logout success")
    this.router.navigate(['/login']);
  }
}
