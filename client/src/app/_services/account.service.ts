import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
apiUrl = 'https://localhost:7249/api/';
private http = inject(HttpClient)

constructor() { }

login(model: any) {
  return this.http.post(this.apiUrl + 'account/login', model).pipe(
    map((response: any) => {
      const user = response;
      if(user){
        localStorage.setItem('2', JSON.stringify(user));
      }
    })
  )
 }

 logout(){
  localStorage.removeItem('user');
 }
}

