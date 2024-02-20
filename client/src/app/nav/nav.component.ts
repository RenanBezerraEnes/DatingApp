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
          this.getCurrentUser();

          console.log(this.loggedIn, 'In and out');
    }

    getCurrentUser(){
        this.accountService.currentUser$.subscribe({
            next: user => this.loggedIn = !!user,
            error: error => console.log(error)
        })
    }

    login() {
        if (this.model.valid) {
            this.accountService.login(this.model.value).subscribe({
                next: (response: any) => {
                    console.log(response);
                    this.loggedIn = true;
                },
                error: (error: any) => console.log(error)
            });
        }
    }

    logout(){
        this.accountService.logout();
        this.loggedIn = false;
    }
    

}
