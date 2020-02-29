import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import{ChatService}from'../chat.service';
import {RegisterService} from'../register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

// to check mail and password
public checkmail=false
public checkpassword=false
  name: any;
  public loginstring:string
  public nouser:string
public checkstring:string

  constructor(public router:Router,private chatservice:ChatService,private register:RegisterService) { }

  ngOnInit() {
  }
  loginsubmit(mail,password){
    if(mail==''&&password==''){
      this.checkmail=true
      this.checkpassword=true
    }
   else if(mail==''){
      this.checkmail=true
    }
    else if(password==''){
      this.checkpassword=true
    }
    else{
    this.checkstring=''
    this.register.logincheck({mail:mail,password:password}).subscribe(
      data=>{if(data=='passwordwrong'){
        this.loginstring='passwordwrong';
        this.checkstring='login'
      }
      if(data=='display chats'){
        this.checkstring=data
        this.loginstring=''
        this.router.navigate(['/chats'])

      }
      if(data=="not exists"){
        this.loginstring='login'
        this.nouser="not exists"
        this.checkstring='login'
      }
    }
    )}
  }



}
