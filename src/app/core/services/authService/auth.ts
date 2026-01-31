import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../../../models/user.model';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor() {
  const userFromStorage = sessionStorage.getItem('user');
  if (userFromStorage) {
    this.currentUserSubject.next(JSON.parse(userFromStorage));
    this.isLoginedInFlag.next(true);
  }
  }
  private http = inject(HttpClient);
  private readonly baseUrl = `${API_URL}/auth`;
  private currentUserSubject=new BehaviorSubject<User | null>(null);
  public currentUser$=this.currentUserSubject.asObservable();

  private isLoginedInFlag=new BehaviorSubject<boolean>(false);
  public isLoginedIn$=this.isLoginedInFlag.asObservable();
  register(userRegister:RegisterRequest)
  {
    const url=`${this.baseUrl}/register`
    return this.http.post<AuthResponse>(url,userRegister).pipe(tap(response=>{
      this.saveSession(response);
    }));
  }
  login(userLoggin:LoginRequest)
  {
    const url=`${this.baseUrl}/login`
    return this.http.post<AuthResponse>(url,userLoggin).pipe(tap(response=>{
      this.saveSession(response);
    }));
  }
  saveSession(authResponse:AuthResponse)
  {
    sessionStorage.setItem('token',authResponse.token);
    sessionStorage.setItem('user',JSON.stringify(authResponse.user));
    this.currentUserSubject.next(authResponse.user);
    this.isLoginedInFlag.next(true);
  }
  
  logout()
  {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.isLoginedInFlag.next(false);
  }
}
