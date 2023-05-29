import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private _AuthService:AuthService, private _Router:Router){}
 
  error:string = ''
  // the form of registration 
  registerForm:FormGroup = new FormGroup({
    displayName: new FormControl (null, [Validators.required,
                                          Validators.minLength(5),
                                          Validators.maxLength(15)]),
    email: new FormControl (null, [Validators.required,Validators.email, ]),
    password: new FormControl (null, [Validators.required, 
      Validators.pattern(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)[A-Za-z\d\W\s_]{6}/)]),
  })

  ngOnInit(): void {
    
  }


  // when the user click on the SIGN UP button, will call this method 
  // send register information to api
  submitRegister(formInfo:FormGroup){
    console.log(formInfo.value)
    this._AuthService.register(formInfo.value).subscribe((response)=>{
      if(response.message == "User created successfully!"){
        this._Router.navigate(['login'])
      }
    },(err)=>{
      this.error = 'This email has already been registered'
    })
  }

}
