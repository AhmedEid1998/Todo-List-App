import { HttpClient, HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import  jwtDecode  from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor{
  
  constructor(private _HttpClient:HttpClient, private _Router:Router) {
    
  // still loged in by jwt token if you close your browser and open it again
    if(localStorage.getItem('userToken') != null){
      this.setUserData();
    }

  }
  
  userData = new BehaviorSubject(null);

  // Do authorization using token 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = JSON.parse( JSON.stringify( localStorage.getItem('userToken')))
    let jwtToken = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token
      }
    })
    return next.handle(jwtToken)
  }


  // registration method 
  register(userData:object):Observable<any>{
    return this._HttpClient.post('http://sorrykid-001-site3.ctempurl.com/api/Account/Register',userData)
  }

  // login method 
  login(userData:object):Observable<any>{
    return this._HttpClient.post('http://sorrykid-001-site3.ctempurl.com/api/Account/Login',userData)
  }

  // logout method 
  logout()
  {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }

  // get taskes from api
  getTodo():Observable<any>{
    return this._HttpClient.get('http://sorrykid-001-site3.ctempurl.com/api/TodoLists')
  }

  // still loged in by jwt token
  setUserData():void
  {
    let endecodedToken = JSON.stringify(localStorage.getItem('userToken'))
    let decodedToken:any = jwtDecode(endecodedToken);
    this.userData.next(decodedToken);
  }


  // send new task to api
  sendTask(userTask:object){
    return this._HttpClient.post('http://sorrykid-001-site3.ctempurl.com/api/TodoLists',userTask)
  }

  // delete task from api
  deleteTask(id:number){
    return this._HttpClient.delete(`http://sorrykid-001-site3.ctempurl.com/api/TodoLists/${id}`)
    // return this._HttpClient.delete(`http://sorrykid-001-site3.ctempurl.com/api/TodoLists/`+id)
  }

  // get taske from api by id
  getTaskById(id:number){
    return this._HttpClient.get(`http://sorrykid-001-site3.ctempurl.com/api/TodoLists/${id}`)
    // return this._HttpClient.delete(`http://sorrykid-001-site3.ctempurl.com/api/TodoLists/`+id)
  }
}
