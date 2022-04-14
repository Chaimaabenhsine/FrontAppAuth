import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../service/auth.service';
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";
import {HttpRequest} from "@angular/common/http";

@Component({
  templateUrl:'dashboard.component.html'
})
export class DashboardComponent implements OnInit {



  userName: string = ''
  users=[];
  projects!:any;

  constructor(private authService: AuthService,private userService:UserService,private router:Router) {
  }
  user={
    username:'',
    id:''
};
  projetForm={
    id:'',
    codeProjet:'',
    nomProjet:'',
    budget:'',
    debut:'',
    fin:''
  }


  ngOnInit(): void {
    this.authService.userInfo.subscribe(value => {
      if (value) {
        this.user.id = value['id'];
        this.user.username = value['username'];
      }
    })
    this.loadProjects();

  }

  loadProjects(){
    this.userService.getProjects().subscribe((value:any) =>{ this.projects=value;
      console.log(this.projects)},(error)=>{console.log('failed to load users')});
  }

  postProject()
  {
    this.userService.postProject(this.projetForm).subscribe((value)=>{console.log(value);this.loadProjects();
      },(error)=>{ console.log(error)});


  }

  clearSearch()
  {
      this.projetForm.codeProjet='';
      this.projetForm.nomProjet='';
      this.projetForm.budget='';
      this.projetForm.debut='';
      this.projetForm.fin='';
  }
  errorMsg = null;
  onSubmit(project:any){
    this.errorMsg = null;
    console.log("the id is "+project.id);
    this.userService.deleteProject(+project.id)
      .subscribe(value=> console.log(value), error=>{
        this.errorMsg = error
      });
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
