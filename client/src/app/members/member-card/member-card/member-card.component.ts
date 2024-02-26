import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../../_models/member';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member | undefined;

  constructor() { }

  ngOnInit() {
  }

}
