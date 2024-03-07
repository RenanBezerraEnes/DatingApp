import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../_models/message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class MemberMessagesComponent implements OnInit {
  @Input() username?: string;
  @Input() messages: Message[] = [];

  constructor() { }

  ngOnInit() {
  }

}
