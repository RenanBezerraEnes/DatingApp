import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ServerErrorComponent {
  error: any;
  private router = inject(Router);

  constructor(){
    
  const navigation = this.router.getCurrentNavigation();
  this.error = navigation?.extras?.state?.['error']
  }

}
