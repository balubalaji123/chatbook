import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';
import{HttpClient,HttpHeaders} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket=io('http://localhost:3000');
private url='/image'
private imageurl='/imageurl'
  constructor(private http:HttpClient) { }
  joinroom(data){
    this.socket.emit('join',data)
  }
  getinitialmessges(){
    let observable=new Observable<{name:String,message:String,likes:number}>(observer=>{
      this.socket.on('output',(data)=>{
        observer.next(data)
      })
      return()=>{this.socket.disconnect()}
    }

    )
    return observable
  }
  type(data){
    this.socket.emit('type',data)

  }
  //to get typing data typing
  ontyping(){
    let observable=new Observable<{name:String,message:String}>(observer=>{
      this.socket.on('typing',(data)=>{
        observer.next(data)
      })
      return()=>{this.socket.disconnect()}
    }

    )
    return observable
  }
  // after like
  getlike(){
    let observable=new Observable<{name:String,message:String,likes:number}>(observer=>{
      this.socket.on('output1',(data)=>{
        observer.next(data)
      })
      return()=>{this.socket.disconnect()}
    }

    )
    return observable
  }
 // after comment
 getcomment(){
  let observable=new Observable<{name:String,message:String,likes:number,comments:String}>(observer=>{
    this.socket.on('output2',(data)=>{
      observer.next(data)
    })
    return()=>{this.socket.disconnect()}
  }

  )
  return observable
}
  newmessageuser(data){
    this.socket.emit('message',data)
  }
  likemessage(data){
    this.socket.emit('like',data)
  }
  comment(data){
    this.socket.emit('comment',data)
  }
  newuser(){
    let observable=new Observable<{name:String,message:String}>(observer=>{
      this.socket.on('new user',(data)=>{
        observer.next(data)
      })
      return()=>{this.socket.disconnect()}
    }

    )
    return observable

  }
  // to retrive currently posted messages
  newmessge(){
    let observable=new Observable<{name:String,message:String,likes:number}>(observer=>{
      this.socket.on('new message',(data)=>{
        observer.next(data)
      })
      return()=>{this.socket.disconnect()}
    }

    )
    return observable
  }
imagepost(image:File){
  
  return this.http.post<any>(this.url,image)
}
// left room response from server
leftroom(){
  let observable=new Observable<{name:String,message:String,likes:number}>(observer=>{
    this.socket.on('left room',(data)=>{
      observer.next(data)
    })
    return()=>{this.socket.disconnect()}
  }

  )
  return observable
}
// req server to leave room
reqleaveroom(data){
  this.socket.emit('leave',data)
}
getimageurl(){
  return this.http.get<any>(this.imageurl)
}

}
