import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';
import { environment } from '../../environments/environment';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
apiUrl = environment.baseUrl;
private currentUserSource = new BehaviorSubject<User | null>(null);
currentUser$ = this.currentUserSource.asObservable();
private http = inject(HttpClient);
private presenceService = inject(PresenceService);

constructor() { }

login(model: any) {
  return this.http.post<User>(this.apiUrl + 'account/login', model).pipe(
    map((response: User) => {
      const user = response;
      if(user){
        this.setCurrentUser(user);
      }
    })
  )
 }

 register(model: any){
  return this.http.post<User>(this.apiUrl + 'account/register', model).pipe(
    map(user => {
      if(user){
        this.setCurrentUser(user);
      }
      return user;
    })
  )
 }

 setCurrentUser(user: User) {
  user.roles = [];
  const roles = this.getDecodedToken(user.token).role;
  Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
  localStorage.setItem('user', JSON.stringify(user));
  this.currentUserSource.next(user);

  //Starting connection with SignalR
  this.presenceService.createHubConnection(user);
 }

 logout(){
  localStorage.removeItem('user');
  this.currentUserSource.next(null);

  //Stopping connection with SignalR
  this.presenceService.stopHubConnection();
 }

 getDecodedToken(token: string){
  return JSON.parse(atob(token.split('.')[1]))
 }
}

