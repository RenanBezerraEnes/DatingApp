import { Component, OnInit, inject } from '@angular/core';
import { Member } from '../../_models/member';
import { MemberService } from '../../_services/member.service';
import { CommonModule } from '@angular/common';
import { MemberCardComponent } from "../member-card/member-card/member-card.component";
import { Observable } from 'rxjs';

@Component({
    selector: 'app-members-list',
    standalone: true,
    templateUrl: './members-list.component.html',
    styleUrls: ['./members-list.component.css'],
    imports: [CommonModule, MemberCardComponent]
})
export class MembersListComponent implements OnInit {
  members$: Observable<Member[]> | undefined;
  private memberService = inject(MemberService);
  constructor() { }

  ngOnInit() {
    this.members$ = this.memberService.getMembers();
  }
}
