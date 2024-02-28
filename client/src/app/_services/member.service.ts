import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  apiUrl = environment.baseUrl;
  private http = inject(HttpClient)

  getMembers(){
    return this.http.get<Member[]>(this.apiUrl + 'users')
  }

  getMember(username: string){
    return this.http.get<Member>(this.apiUrl + 'users/' + username);
  }

  updateMember(member: Member){
    console.log(member, 'Member');
    return this.http.put(this.apiUrl + 'users', member);
  }

}
