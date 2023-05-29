import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService, private _Router:Router){}

  error:string = ''
  userData:string = ''

  // the form of login
  loginForm:FormGroup = new FormGroup({
    email: new FormControl (null, [Validators.required, Validators.email ]),
    password: new FormControl (null, [Validators.required,
      Validators.pattern(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)[A-Za-z\d\W\s_]{6}/), ] ),
  })


  // when the user click on the LOGIN button, will call this method 
  // send login information to api
  submitLogin(formInfo:FormGroup){
    this._AuthService.login(formInfo.value).subscribe((response)=>{
      if(response.displayName == null){
        localStorage.setItem('userToken', response.token)
        this._AuthService.setUserData();
        this._Router.navigate(['/todolist'])
      }
    },(err)=>{
      this.error = 'This Email Or Password Is Incorrect'
    })
  }

}
