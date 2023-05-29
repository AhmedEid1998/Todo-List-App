import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LogGuard implements CanActivate {

  constructor(private _AuthService: AuthService, private _Router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):| Observable<boolean | UrlTree>| Promise<boolean | UrlTree>| boolean| UrlTree {
    
    // can't open login or register page without doing logout
    if (this._AuthService.userData.getValue() != null) {
      this._Router.navigate(['/todolist']);
      return false;
    } else {
      return true;
    }
  }
}
