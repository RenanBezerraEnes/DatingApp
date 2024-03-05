import { Component, OnInit, inject } from '@angular/core';
import { Member } from '../_models/member';
import { MemberService } from '../_services/member.service';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MemberCardComponent } from "../members/member-card/member-card/member-card.component";
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { Pagination } from '../_models/pagination';

@Component({
    selector: 'app-lists',
    standalone: true,
    templateUrl: './lists.component.html',
    styleUrls: ['./lists.component.css'],
    imports: [CommonModule, TabsModule, MemberCardComponent, FormsModule, PaginationModule, ButtonsModule, FormsModule]
})
export class ListsComponent implements OnInit {
  members: Member[] | undefined;
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination | undefined;

  private memberService = inject(MemberService);
  constructor() { }

  ngOnInit() {
    this.loadLikes();
  }


  loadLikes(){
    this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe({
      next: response => {
        this.members = response.result;
        this.pagination = response.pagination;
      }
    })
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadLikes();
    }
  }
}
