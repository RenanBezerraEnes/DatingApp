import { Component, Inject, OnInit, inject } from '@angular/core';
import { Member } from '../../_models/member';
import { MemberService } from '../../_services/member.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  imports: []
})
export class MemberDetailComponent implements OnInit {
  member: Member | undefined;
  private memberService = inject(MemberService);

  constructor(private route: ActivatedRoute){}

  ngOnInit() {
    this.loadMember();
  }

  loadMember(){
    const username = this.route.snapshot.paramMap.get('username');
    if(!username) return;

    this.memberService.getMember(username).subscribe({
      next: member => this.member = member
    })
  }

}
