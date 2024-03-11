import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  apiUrl = environment.baseUrl
  private http = inject(HttpClient);

  constructor() { }

  getUsersWithRoles(){
    return this.http.get<User[]>(this.apiUrl + 'admin/users-with-roles');
  }

  updatedUserRole(username: string, roles: string){
    return this.http.post<string[]>(this.apiUrl + 'admin/edit-roles/' + username + '?roles=' + roles, {});
  }
}
