import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
baseUrl = 'https//localhost:7249/api/';
private http = Inject(HttpClient);

constructor() { }

login(model: any) {
  return this.http.post(this.baseUrl + 'account/login', model);
 }
}
