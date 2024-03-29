import { Component, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { Member } from '../../_models/member';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { MemberService } from '../../_services/member.service';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryModule } from 'ng-gallery';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PhotoEditorComponent } from "../photo-editor/photo-editor.component";

@Component({
    selector: 'app-member-edit',
    templateUrl: './member-edit.component.html',
    styleUrls: ['./member-edit.component.css'],
    standalone: true,
    imports: [CommonModule, TabsModule, GalleryModule, ReactiveFormsModule, PhotoEditorComponent]
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm |undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){
    if(this.editForm?.dirty){
      $event.returnValue = true;
    }
  }
  model!: FormGroup;
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService)
  user: User | null = null;
  member: Member | undefined;
 
  constructor(private accountService: AccountService, private memberService: MemberService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
   }

  ngOnInit() {
    this.loadMember();
    this.model = this.fb.group({
      introduction: ['', Validators.required],
      lookingFor: ['', Validators.required],
      interests: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  loadMember() {
    if(!this.user) return;
    this.memberService.getMember(this.user.username).subscribe({
      next: member => {
        this.member = member;
        this.model.patchValue({
          introduction: member.introduction,
          lookingFor: member.lookingFor,
          interests: member.interests,
          city: member.city,
          country: member.country,
          username: member.userName
        });
      }
    })
  }

  updateMember(){
    this.memberService.updateMember(this.model?.value).subscribe({
      next: _ => {
        this.toastr.success('Profile updated successfully');
        this.editForm?.reset(this.member);
      },
      error: (error) => {
        console.log(error.error)
    }
    })
  }

}
