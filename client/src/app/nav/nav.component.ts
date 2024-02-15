import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
    selector: 'app-nav',
    standalone: true,
    imports: [
        CommonModule, ReactiveFormsModule
    ],
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit { 
    model!: FormGroup;
    loggedIn = false;
    private accountService = inject(AccountService);
    private fb = inject(FormBuilder);

    ngOnInit(): void {
        this.model = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
          });
    }

    login() {
        // Check if the form is valid before proceeding
        if (this.model.valid) {
            // Pass the form values to the login function
            this.accountService.login(this.model.value).subscribe({
                next: (response: any) => {
                    console.log(response);
                    this.loggedIn = true;
                },
                error: (error: any) => console.log(error)
            });
        }
    }
    

}
