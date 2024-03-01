import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Member } from '../_models/member';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  apiUrl = environment.baseUrl;
  members: Member[] = [];
  private http = inject(HttpClient)

  getMembers(){
    if (this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.apiUrl + 'users').pipe(
      map(members => {
        this.members = members;
        return members;
      })
    )
  }

  getMember(username: string){
    const member = this.members.find(x => x.userName == username);
    if(member) return of(member);

    return this.http.get<Member>(this.apiUrl + 'users/' + username);
  }

  updateMember(member: Member){
    return this.http.put(this.apiUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = {...this.members[index], ...member}
      })
    )
  }

  setMainPhoto(photoId: number){
    return this.http.put(this.apiUrl + 'users/set-main-photo/' + photoId, {});
  }

}
