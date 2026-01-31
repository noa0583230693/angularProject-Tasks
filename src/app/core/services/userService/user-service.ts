import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { API_URL } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersSubject=new BehaviorSubject<User[]>([]);
  users$=this.usersSubject.asObservable();
  private readonly baseUrl = `${API_URL}/teams`;
    private http = inject(HttpClient);

  addUser(user: User): void {
      const currentUsers = this.usersSubject.getValue();
      this.usersSubject.next([...currentUsers, user]);
  }
  postUser(user:  User):Observable<User>{
    return this.http.post<User>(this.baseUrl,user).pipe(tap(newUser=>{
      const currentUsers=this.usersSubject.getValue();
      this.usersSubject.next([...currentUsers,{...newUser}]);
    }));
  }
}