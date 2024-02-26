import { Component, OnInit, inject } from '@angular/core';
import { Member } from '../../_models/member';
import { MemberService } from '../../_services/member.service';
import { CommonModule } from '@angular/common';
import { MemberCardComponent } from "../member-card/member-card/member-card.component";

@Component({
    selector: 'app-members-list',
    standalone: true,
    templateUrl: './members-list.component.html',
    styleUrls: ['./members-list.component.css'],
    imports: [CommonModule, MemberCardComponent]
})
export class MembersListComponent implements OnInit {
  members: Member[] = [];
  private memberService = inject(MemberService);
  constructor() { }

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers().subscribe({
      next: members => this.members = members
    })
  }

}
