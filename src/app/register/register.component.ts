import { Component, OnInit } from '@angular/core';
import {RegisterService} from'../register.service';
import { from } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private register:RegisterService,public router:Router) { }
public checkstring='a'
// to check form fields
public checkmail=false
public checkusername=false
public checkpassword=false
public checkotp=false
  ngOnInit() {
  }
  onsubmit(username,mail,password){
    if(username==''&&mail==''&&password==''){
      this.checkmail=true
      this.checkpassword=true
      this.checkusername=true
    }
    else if(username==''){
      this.checkmail=false
      this.checkpassword=false
      this.checkusername=true
    }
    else if(mail==''){
      
      this.checkmail=true
      this.checkpassword=false
      this.checkusername=false

    }
    else if(password==''){
      
      this.checkmail=false
      this.checkpassword=true
      this.checkusername=false
    }
    else{
    this.register.register({name:username,mail:mail,password:password}).subscribe(
      data=>{this.checkstring=data;if(data=='useralreadyexists'){
        this.checkmail=false
        this.checkpassword=false
        this.checkusername=false
        this.checkotp=false
      }},
      err=>console.log(err)
    )
    }
  }
  otpsubmit(otp){
    this.register.checkotp({otp1:otp}).subscribe(
      data=>{if(data=='ok'){
        this.router.navigate(['/chats'])
      }
    if(data=='not ok'){
      this.checkotp=true
    }
    },
      err=>console.log(err)
    )


  }

}
