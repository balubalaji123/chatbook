import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private url='/register'
  private url1='/register/otp'
  private url2='/login'
private url4='/name'
private logout='/logout'
private session='/logout/session'
  constructor(private http:HttpClient) { }
register(details){
  let headers=new Headers({'Content-Type':'application/json'})
  return this.http.post<any>(this.url,details)
}
checkotp(data){
  return this.http.post<any>(this.url1,data)
}
// for login
logincheck(data){
  return this.http.post<any>(this.url2,data)
}
// for name
getname(){
  return this.http.get<any>(this.url4)
}
// for logout
logout1(){
return this.http.get<any>(this.logout)
}
checksession(){
  return this.http.get<any>(this.session)
}
}
