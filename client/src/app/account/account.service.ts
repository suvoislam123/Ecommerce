import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, map, of } from 'rxjs';
import { environment } from 'src/environment/environment';
import { IUser } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentuserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentuserSource.asObservable();
  constructor(private http:HttpClient,private router:Router) {

   }
  

  loadCurrentUser(token: string) {
    if (token === null) {
      this.currentuserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get(this.baseUrl + 'account', { headers }).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentuserSource.next(user);
        }
      })
    );
  }
  login(values:any){
    return this.http.post(this.baseUrl+'account/login',values).pipe(
      map((user:IUser)=>{
        if(user){
          localStorage.setItem('token',user.token);
          this.currentuserSource.next(user);
        }
      })
    );
  }
  
  register(values:any){
    return this.http.post(this.baseUrl+'account/register',values).pipe(
      map((user:IUser)=>{
        if(user){
          localStorage.setItem('token',user.token);
        }
      })
    );
  }

  logout(){
    localStorage.removeItem('token');
    this.currentuserSource.next(null);
    this.router.navigateByUrl('/');
  }
  checkEmailExists(email:string){
    return this.http.get(this.baseUrl+'account/emailexists?email='+email);
  }
}
