import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';

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
    public accountService = inject(AccountService);
    private fb = inject(FormBuilder);

    ngOnInit(): void {
        this.model = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
          });
    }

    login() {
        if (this.model.valid) {
            this.accountService.login(this.model.value).subscribe({
                next: (response: any) => {
                    console.log(response);
                },
                error: (error: any) => console.log(error)
            });
        }
    }

    logout(){
        this.accountService.logout();
    }
    

}
