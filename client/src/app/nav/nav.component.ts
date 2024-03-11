import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HasRoleDirective } from '../_directives/has-role.directive';

@Component({
    selector: 'app-nav',
    standalone: true,
    imports: [
        CommonModule, ReactiveFormsModule, RouterModule, HasRoleDirective
    ],
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit { 
    model!: FormGroup; 
    public accountService = inject(AccountService);
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private toastr = inject(ToastrService);

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
                error: (error) => {
                    this.toastr.error("The credentials are incorrect!")
                    console.log(error.error)
                }
                
            });
        }
    }

    logout(){
        this.accountService.logout();
        this.router.navigateByUrl("/");
    }
    

}
