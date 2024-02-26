import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  apiUrl = environment.baseUrl;
  private http = inject(HttpClient)

  getMembers(){
    return this.http.get<Member[]>(this.apiUrl + 'users', this.getHttpOptions())
  }

  getMember(username: string){
    this.http.get<Member>(this.apiUrl + 'users/' + username, this.getHttpOptions());
  }

  getHttpOptions(){
    const userString = localStorage.getItem('user');

    if(!userString) return;

    const user = JSON.parse(userString);
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + user.token
      })
    }
  }

}
