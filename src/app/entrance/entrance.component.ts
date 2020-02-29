import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import{ChatService}from'../chat.service';
import {RegisterService} from'../register.service';

@Component({
  selector: 'app-entrance',
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.css']
})
export class EntranceComponent implements OnInit {
  
  ngOnInit() {
  }
//   beforejoin: boolean;
//   name: any;
//   public loginstring:string
//   public nouser:string
// public checkstring:string

//   constructor(public router:Router,private chatservice:ChatService,private register:RegisterService) { }

//   loginsubmit(mail,password){
//     this.checkstring=''
//     this.register.logincheck({mail:mail,password:password}).subscribe(
//       data=>{if(data=='passwordwrong'){
//         this.loginstring='passwordwrong';
//         this.checkstring='login'
//       }
//       if(data=='display chats'){
//         this.checkstring=data
//         this.loginstring=''
//         this.router.navigate(['/chats'])

//       }
//       if(data=="not exists"){
//         this.loginstring='login'
//         this.nouser="not exists"
//         this.checkstring='login'
//       }
//     }
//     )
//   }


}
