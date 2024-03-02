import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { TextInputComponent } from "../_forms/text-input/text-input.component";
import { DatePickerComponent } from '../_forms/date-picker/date-picker.component';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
  private router = inject(Router);
  maxDate: Date = new Date();
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService)
  @Output() cancelRegister: EventEmitter<boolean> = new EventEmitter<boolean>();
  validationErrors: string[] = [];

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
    const dob = this.getDateOnly(this.registerForm.controls['dateOfBirth'].value);
    const values = {...this.registerForm.value, dateOfBirth: dob};

    if(!dob){
      console.error("Date of birth is null or wrong");
      return
    }
      this.accountService.register(values).subscribe({
        next: () => {
          this.router.navigateByUrl('/members');
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse && error.status === 400) {
            if (error.error && error.error.errors) {
              const validationErrorsObject = error.error.errors;
              const validationErrorsArray = Object.values(validationErrorsObject).flat();
              this.validationErrors = validationErrorsArray.map((error: unknown) => String(error));
            }
         }
        }
      })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

  private getDateOnly(dob: string | undefined){
    if(!dob) return;
    let theDob = new Date(dob);
    let dateOnly = new Date(theDob.setMinutes(theDob.getMinutes()-theDob.getTimezoneOffset()));
    return dateOnly.toISOString().slice(0, 10);
  }

}
