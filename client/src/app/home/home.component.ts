import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users$: Observable<any> | undefined;
  private http = inject(HttpClient)

  constructor() { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.users$ = this.http.get("https://localhost:7249/api/users")
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }

}
