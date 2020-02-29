import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { HttpClient } from '@angular/common/http';
import {RegisterService} from'../register.service';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.css']
})
export class ChattingComponent implements OnInit {
  title = 'chatbook';
  public images
  public uri='http://localhost:3000/image'
  public forcomments=-1
  public imagecheck=false
  public newuser:Array<{name:String,message:String}>=[]
  public messages:any=[]
  public imageUrl='../../assets/default.jpg'
  public typing1:Array<{name:String,message:String}>=[]
public image:File
public name
public leftuser:Array<{name:String,message:String}>=[]
  public messages1:string
  public comment:string
  constructor(public router:Router,private chatservice:ChatService,private http: HttpClient,private register:RegisterService){
  //  for session check
  this.register.checksession().subscribe(
    data=>{if(!data){
      this.router.navigate(['/login1'])
    }
    else{
      // to join user in the room
      this.join();
    }
  },
    err=>console.log(err)
  )
    this.chatservice.ontyping().subscribe(
      data=>{this.typing1=[];this.typing1.push(data)}
    )
    
    // to get initial messages
    this.chatservice.getinitialmessges().subscribe(
      data=>{this.messages=data,console.log('initialing',typeof(this.messages));
        }
    )
    this.chatservice.newmessge().subscribe(
    
      // because to display new message
      data=>{this.messages=data,console.log('new messsage',data),this.messages1=''}
    )
    this.chatservice.newuser().subscribe(
      data=>{this.newuser=[],this.newuser.push(data),this.clearnewuser()}
    )
    // to dissapper after some time
    // user went out
    this.chatservice.leftroom().subscribe(
      data=>{console.log('left user',data),this.leftuser=[],this.leftuser.push(data),this.clearleftuser()}
    )
    // to get instant comments
    this.chatservice.getcomment().subscribe(
      data=>{this.messages=data}
    )
    // to get likes
    this.chatservice.getlike().subscribe(
      data=>{this.messages=data}
    )
  }
  ngOnInit(){}
  // function to join user in room
  join(){
        this.register.getname().subscribe(
      data=>{    this.chatservice.joinroom({name:data});this.name=data},
      err=>console.log(err)
    )
  }
  newmessage(){
    this.typing1=[]
    var inputElement = <HTMLInputElement><unknown>document.getElementById('message');
inputElement.value = '';
    // to upload image
    if(this.imagecheck){
      this.onimage()
    }
    this.chatservice.newmessageuser({image:this.images,name:this.name,message:this.messages1}) 
    this.messages1=''
  }
  like(name,message){
    var c={name:name,message:message}
    this.chatservice.likemessage(c)
    
  }
  clearnewuser(){
    setTimeout(()=>{
      this.newuser=[]
    },3000)
  }
  // to clear left user
  clearleftuser(){
    setTimeout(()=>{
      this.leftuser=[]
    },3000)
  }
  commentaction(name,message,comment){
    var c={username:this.name,name:name,message:message,comment:comment}
    this.chatservice.comment(c)
   
  }
  typing(){
    this.chatservice.type({name:this.name,message:"is typing"}) 
  }
  showcomments(i){
    this.forcomments=i
  }
  // for image
  selectimage(event){
    this.imagecheck=!this.imagecheck
    if(event.target.files.length>0){
      const file=event.target.files[0]
  this.images=file
  var reader = new FileReader();
    reader.onload = (event : any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(file);
    }
  }
  onimage(){
    const formdata=new FormData()
    formdata.append('file',this.images)
    this.http.post<any>(this.uri,formdata).subscribe(
      data=>{if(data){this.imagecheck=false}},
      error=>console.log(error)
    ) 
  }
  logout(){
    this.chatservice.reqleaveroom({name:this.name})
    this.register.logout1().subscribe(
      data=>{if(data=="logout sucess")
    {
      this.router.navigate(['/login1'])
    }
    },
    err=>console.log(err)
    )
  }
}
