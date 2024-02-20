import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
apiUrl = 'https://localhost:7249/api/';
private currentUserSource = new BehaviorSubject<User | null>(null);
currentUser$ = this.currentUserSource.asObservable();
private http = inject(HttpClient)

constructor() { }

login(model: any) {
  return this.http.post<User>(this.apiUrl + 'account/login', model).pipe(
    map((response: User) => {
      const user = response;
      if(user){
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSource.next(user);
      }
    })
  )
 }

 setCurrentUser(user: User) {
  this.currentUserSource.next(user);
 }

 logout(){
  localStorage.removeItem('user');
  this.currentUserSource.next(null);
 }
}

