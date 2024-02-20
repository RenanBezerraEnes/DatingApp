import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegisterComponent implements OnInit {
  model!: FormGroup;;
  private fb = inject(FormBuilder); 

  constructor() { }

  ngOnInit() {
    this.model = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register(){
    console.log(this.model);
  }

  cancel(){
    console.log('cancelled!');
  }

}
