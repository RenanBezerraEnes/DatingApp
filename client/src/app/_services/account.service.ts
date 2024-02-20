import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
apiUrl = 'https://localhost:7249/api/';
private http = inject(HttpClient)

constructor() { }

login(model: any) {
  return this.http.post(this.apiUrl + 'account/login', model);
 }
}
