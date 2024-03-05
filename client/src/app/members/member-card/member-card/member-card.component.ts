import { Component, Input, OnInit, inject } from '@angular/core';
import { Member } from '../../../_models/member';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MemberService } from '../../../_services/member.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member | undefined;

  private memberService = inject(MemberService);
  private toastr = inject(ToastrService);

  constructor() { }

  ngOnInit() {
  }

  addLike(member: Member){
    this.memberService.addLike(member.userName).subscribe({
      next: () => this.toastr.success("You've liked " + member.knownAs)
    })
  }

}
