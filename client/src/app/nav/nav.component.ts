import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
    selector: 'app-nav',
    standalone: true,
    imports: [
        CommonModule, ReactiveFormsModule, RouterModule
    ],
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit { 
    model!: FormGroup; 
    public accountService = inject(AccountService);
    private fb = inject(FormBuilder);
    private router = inject(Router);

    ngOnInit(): void {
        this.model = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
          });
    }

    login() {
        if (this.model.valid) {
            this.accountService.login(this.model.value).subscribe({
                next: () => {
                    this.router.navigateByUrl("/members");
                },
                error: (error) => console.log(error)
            });
        }
    }

    logout(){
        this.accountService.logout();
        this.router.navigateByUrl("/");
    }
    

}
