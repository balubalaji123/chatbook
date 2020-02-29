import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChattingComponent } from './chatting/chatting.component';
import { EntranceComponent } from './entrance/entrance.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  {path:'chats',component:ChattingComponent},
  {path:'',component:HomeComponent},
  {path:'login1',component:LoginComponent},
  {path:'register1',component:RegisterComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
