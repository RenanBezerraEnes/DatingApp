import { Component, OnInit, inject } from '@angular/core';
import { Member } from '../../_models/member';
import { MemberService } from '../../_services/member.service';
import { CommonModule } from '@angular/common';
import { MemberCardComponent } from "../member-card/member-card/member-card.component";
import { Observable, take } from 'rxjs';
import { Pagination } from '../../_models/pagination';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { UserParams } from '../../_models/userParams';
import { User } from '../../_models/user';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@Component({
    selector: 'app-members-list',
    standalone: true,
    templateUrl: './members-list.component.html',
    styleUrls: ['./members-list.component.css'],
    imports: [CommonModule, MemberCardComponent, PaginationModule, FormsModule, ButtonsModule]
})
export class MembersListComponent implements OnInit {
  members: Member[] = [];
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}]

  constructor(private memberService: MemberService) {
    this.userParams = this.memberService.userParams;
   }

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers(){
    if(!this.userParams) return;
    this.memberService.getMembers(this.userParams).subscribe({
      next: response => {
        if(response.result && response.pagination){
          this.members = response.result;
          this.pagination = response.pagination;
        }
      }
    })
  }

  resetFilters(){
      this.userParams = this.memberService.resetUserParams();
      this.loadMembers();
  }

  pageChanged(event: any){
    if(this.userParams && this.userParams?.pageNumber !== event.page){
      this.userParams.pageNumber = event.page;
      this.memberService.setUserParams(this.userParams);
      this.loadMembers();
    }
  }
}
