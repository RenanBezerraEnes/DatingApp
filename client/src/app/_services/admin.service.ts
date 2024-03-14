import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { Photo } from '../_models/photo';

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

  getPhotosForApproval() {
    return this.http.get<Photo[]>(this.apiUrl + 'admin/photos-to-moderate');
  }
    approvePhoto(photoId: number) {
    return this.http.post(this.apiUrl + 'admin/approve-photo/' + photoId, {});
  }
    rejectPhoto(photoId: number) {
    return this.http.post(this.apiUrl + 'admin/reject-photo/' + photoId, {});
  }
}
