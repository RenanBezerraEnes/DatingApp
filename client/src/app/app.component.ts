import { CommonModule, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { NavComponent } from "./nav/nav.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HttpClientModule, NgIf, CommonModule, NavComponent]
})
export class AppComponent implements OnInit{
  title = 'client';
  users$: Observable<any> | undefined;
  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.users$ = this.http.get("https://localhost:7249/api/users")
  }
}
