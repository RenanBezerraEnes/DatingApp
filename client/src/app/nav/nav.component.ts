import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-nav',
    standalone: true,
    imports: [
        CommonModule, ReactiveFormsModule
    ],
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
})
export class NavComponent { 
    model:any = new FormGroup({
        username: new FormControl(""),
        password: new FormControl("")
    })

    login() {
        console.log("Hello world", this.model);
    }

}
