import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { TextInputComponent } from "../_forms/text-input/text-input.component";
import { DatePickerComponent } from '../_forms/date-picker/date-picker.component';

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    imports: [CommonModule, ReactiveFormsModule, TextInputComponent, DatePickerComponent]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  private fb = inject(FormBuilder); 
  maxDate: Date = new Date();
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService)
  @Output() cancelRegister: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    })
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMachting: true}
    }
  }

  register(){
    console.log(this.registerForm?.value);
      // this.accountService.register(this.registerForm.value).subscribe({
      //   next: () => {
      //     this.cancel();
      //   },
      //   error: (error) => {
      //     this.toastr.error("The credentials are incorrect!")
      //     console.log(error.error)
      //   }
      // })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
