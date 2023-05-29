import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TodolistComponent } from './todolist/todolist.component';
import { AuthGuard } from './guards/auth.guard';
import { LogGuard } from './guards/log.guard';
import { NotfoundComponent } from './notfound/notfound.component';
 

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'register', canActivate:[LogGuard], component:RegisterComponent},
  {path:'login', canActivate:[LogGuard], component:LoginComponent},
  {path:'todolist', canActivate:[AuthGuard], component:TodolistComponent},
  {path:'**', canActivate:[AuthGuard], component:NotfoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
