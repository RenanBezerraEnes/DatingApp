import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';

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
  private accountService = inject(AccountService);
  @Output() cancelRegister: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {
    this.model = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register(){
    if(this.model.valid){
      this.accountService.register(this.model.value).subscribe({
        next: response => {
          console.log(response);
          this.cancel();
        },
        error: error => {
          console.log(error);
        }
      })
    }
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
