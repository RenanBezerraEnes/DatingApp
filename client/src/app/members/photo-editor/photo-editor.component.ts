import { Component, Input, OnInit, inject } from '@angular/core';
import { Member } from '../../_models/member';
import { CommonModule } from '@angular/common';
import { FileUploadModule, FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { take } from 'rxjs';
import { Photo } from '../../_models/photo';
import { MemberService } from '../../_services/member.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css'],
  standalone: true,
  imports: [CommonModule, FileUploadModule]
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: Member | undefined;
  uploader: FileUploader |undefined;
  hasBaseDropZoneOver = false;
  baseUrl = environment.baseUrl;
  user: User | undefined;
  memberService = inject(MemberService);
  
  constructor(private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user) this.user = user;
      }
    })
   }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any){
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo){
    this.memberService.setMainPhoto(photo.id).subscribe({
      next: () => {
        if(this.user && this.member){
          this.user.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.user);
          this.member.photoUrl = photo.url;
          this.member.photos.forEach(p => {
            if(p.isMain) p.isMain = false;
            if(p.id === photo.id) p.isMain = true;
          })
        }
      }
    })
  }

  deletePhoto(photoId: number){
    this.memberService.deletePhoto(photoId).subscribe({
      next: _ => {
        if(this.member){
          this.member.photos = this.member.photos.filter(x => x.id !== photoId);
        }
      }
    })
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response){
        const photo = JSON.parse(response);
        this.member?.photos.push(photo);
        if(photo.isMain && this.user && this.member){
          this.user.photoUrl = photo.url;
          this.member.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.user);
        }
      }
    }
  }

}
