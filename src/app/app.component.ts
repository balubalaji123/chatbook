import { Component } from '@angular/core';
import{ChatService}from'./chat.service';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import {RegisterService} from'./register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'chatbook';
  // public images
  // public uri='http://localhost:3000/image'
  // public forcomments=-1
  // public visiblecomments=false
  // public name:string
  // public imagecheck=false
  // public newuser:Array<{name:String,message:String}>=[]
  // public messages:any=[]
  // public messages3:Array<{name:String,message:String}>=[]
  // public imageUrl='../../assets/default.jpg'
  // // for updation
  // public messages4:Array<{name:String,message:String}>=[]
//   public typing1:Array<{name:String,message:String}>=[]
// public image:File
//   public messages1:string
  // public comment:string
// to  decide which string is need to display
// public checkstring='first'
// to handle registration form
// public registerstring:string
// to handle loginform
// public loginstring:string
// string if no user exists
// public nouser:string
//   constructor(private register:RegisterService,private chatservice:ChatService,private http: HttpClient,public router:Router){
//     this.chatservice.ontyping().subscribe(
//       data=>{    this.typing1=[];this.typing1.push(data)}
//     )
    // to get initial messages
    // this.chatservice.getinitialmessges().subscribe(
    //   data=>{this.messages=data,console.log('initialing',this.messages);
    //     }
    // )
    // this.chatservice.newmessge().subscribe(
      // because to display new image
    //   data=>{this.messages.push(data),console.log('new messsage',this.messages),this.messages1=''}
    // )
    // this.chatservice.newuser().subscribe(
    //   data=>{this.newuser=[],this.newuser.push(data),this.clearnewuser()}
    // )
  // to get username
    // to get likes
//     this.chatservice.getlike().subscribe(
//       data=>{this.messages=data}
//     )
//   }
//   join(){
//     console.log('name',this.name)
//     this.register.getname().subscribe(
//       data=>{this.name=data},
//       err=>console.log(err)
//     )
   
//     this.chatservice.joinroom({name:this.name})
//   }
//   newmessage(){
//     this.typing1=[]
//     var inputElement = <HTMLInputElement><unknown>document.getElementById('message');
// inputElement.value = '';
    // to upload image
  //   if(this.imagecheck){
  //     this.onimage()
  //   }
  //   this.chatservice.newmessageuser({image:this.images,name:this.name,message:this.messages1}) 

  // }
  // like(name,message){
    // this.messages2=[]
  //   var c={name:name,message:message}
  //   this.chatservice.likemessage(c)
    
  // }
  // clearnewuser(){
  //   setTimeout(()=>{
  //     this.newuser=[]
  //   },3000)
  // }
  // commentaction(name,message,comment){

    // this.messages4=[]
  //   var c={username:this.name,name:name,message:message,comment:comment}
  //   console.log('c'+JSON.stringify(c))
  //   this.chatservice.comment(c)
   
  // }
  // typing(){
  //   this.chatservice.type({name:this.name,message:"is typing"}) 
  // }
  // showcomments(i){
  //   this.visiblecomments=!this.visiblecomments 
  //   this.forcomments=i
  //   console.log("comments",this.visiblecomments)
  // }
  // for image
//   selectimage(event){
// console.log('select image')

//     this.imagecheck=!this.imagecheck
//     if(event.target.files.length>0){
//       const file=event.target.files[0]
//   this.images=file
//   var reader = new FileReader();
//     reader.onload = (event : any) => {
//       this.imageUrl = event.target.result;
//     }
//     reader.readAsDataURL(file);
//     }
//   }
//   onimage(){
// console.log('on image')
//     const formdata=new FormData()
//     formdata.append('file',this.images)
//     this.http.post<any>(this.uri,formdata).subscribe(
//       data=>{if(data){this.imagecheck=!this.imagecheck}},
//       error=>console.log(error)
//     ) 
//   }
  // to decide to display login or register form
  // loginorregister(a){
  //   this.checkstring=a
  //   this.nouser=''
  // }
  // code related to registeration and otp checking
  // onsubmit(username,mail,password){
  //   this.checkstring=''
  //   this.register.register({name:username,mail:mail,password:password}).subscribe(
  //     data=>this.registerstring=data,
  //     err=>console.log(err)
  //   )

  // }
  // otpsubmit(otp){
  //   this.registerstring=''
  //   this.register.checkotp({otp1:otp}).subscribe(
  //     data=>{if(data=='ok'){
  //     this.checkstring='display chats'
  //     this.join()
  //     }},
  //     err=>console.log(err)
  //   )


  // }
  // to handle login
  // loginsubmit(mail,password){
  //   this.checkstring=''
  //   this.register.logincheck({mail:mail,password:password}).subscribe(
  //     data=>{if(data=='passwordwrong'){
  //       this.loginstring='passwordwrong';
  //       this.checkstring='login'
  //     }
  //     if(data=='display chats'){
  //       this.checkstring=data
  //       this.loginstring=''
  //       this.join()
  //     }
  //     if(data=="not exists"){
  //       this.loginstring='login'
  //       this.nouser="not exists"
  //       this.checkstring='login'
  //     }
  //   }
  //   )
  // }

}
