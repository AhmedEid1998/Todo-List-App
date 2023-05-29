import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(private _AuthService:AuthService){}



  isLogin: boolean = false;

  ngOnInit(): void {

    this._AuthService.userData.subscribe(() => {
      if (this._AuthService.userData.getValue() == null) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }

    });}

    logoutBridge(){
      this._AuthService.logout();
    }

}
