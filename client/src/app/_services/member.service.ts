import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Member } from '../_models/member';
import { map, of, take } from 'rxjs';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { User } from '../_models/user';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  apiUrl = environment.baseUrl;
  members: Member[] = [];
  memberCache = new Map();
  userParams: UserParams | undefined;
  user: User | undefined;

  private http = inject(HttpClient)

  constructor(private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user){
          this.userParams = new UserParams(user);
          this.user = user;
        }
      }
    })
  }

  getUserParams(){
    this.userParams;
  }

  setUserParams(params: UserParams){
    this.userParams = params; 
  }

  resetUserParams(){
    if(this.user){
      this.userParams = new UserParams(this.user);
      return this.userParams;
    }
    return;
  }

  getMembers(userParams: UserParams){
    const response = this.memberCache.get(Object.values(userParams).join('-'));

    if(response) return of(response);

    let params = getPaginationHeaders(userParams. pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return getPaginatedResult<Member[]>(this.apiUrl + 'users', params, this.http).pipe(map(response => {
      this.memberCache.set(Object.values(userParams).join('-'), response);
      return response;
    }))
  }

  getMember(username: string){
    const member = [...this.memberCache.values()]
    .reduce((previousValue, currentValue) => previousValue.concat(currentValue.result), [])
    .find((member: Member) => member.userName ==  username)

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

  deletePhoto(photoId: number){
    return this.http.delete(this.apiUrl + 'users/delete-photo/' + photoId);
  }

  addLike(username: string){
    return this.http.post(this.apiUrl + 'likes/' + username, {});
  }

  getLikes(predicate: string, pageNumber: number, pageSize: number){
    let params = getPaginationHeaders(pageNumber, pageSize);

    params = params.append('predicate', predicate);

    return getPaginatedResult<Member[]>(this.apiUrl + 'likes/',params, this.http);
  }

}
