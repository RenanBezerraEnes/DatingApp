import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Member } from '../../_models/member';
import { MemberService } from '../../_services/member.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabDirective, TabsModule, TabsetComponent } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { MemberMessagesComponent } from "../member-messages/member-messages.component";
import { MessageService } from '../../_services/message.service';
import { Message } from '../../_models/message';


@Component({
    selector: 'app-member-detail',
    standalone: true,
    templateUrl: './member-detail.component.html',
    styleUrls: ['./member-detail.component.css'],
    imports: [CommonModule, TabsModule, GalleryModule, MemberMessagesComponent]
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs', {static: true}) memberTabs?: TabsetComponent;
  member: Member = {} as Member;
  images: GalleryItem[] = [];
  messages: Message[] = [];
  activeTab?: TabDirective;

  private memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);

  constructor(){}

  ngOnInit() {
    this.route.data.subscribe({
      next: data => this.member = data['member']
    })

    this.route.queryParams.subscribe({
      next: params => {
        params['tab'] && this.selectTab(params['tab'])
      }
    })

    this.loadImages();
  }

  onTabActivated(data: TabDirective){
    this.activeTab = data;
    if(this.activeTab.heading === 'Messages'){
      this.loadMessages();
    }
  }

  selectTab(heading: string){
    if(this.memberTabs){
      this.memberTabs.tabs.find(x => x.heading === heading)!.active = true;
    }
  }

  
  loadMessages(){
    if(this.member){
      this.messageService.getMessageThread(this.member.userName).subscribe({
        next: messages => this.messages = messages
      })
    }
  }

  // loadMember(){
  //   const username = this.route.snapshot.paramMap.get('username');
  //   if(!username) return;

  //   this.memberService.getMember(username).subscribe({
  //     next: member => {this.member = member,
      
  //     this.loadImages()
  //     }
  //   })
  // }

  loadImages(){
    if(!this.member) return;
    for(const photo of this.member?.photos){
      this.images.push(new ImageItem({src: photo.url, thumb: photo.url}))
    }
  }

  formatLastActiveDate(): string {
    if (!this.member || !this.member.lastActive) return '';
    return this.member.lastActive.toLocaleString(); // Adjust toLocaleString() according to your date format requirements
  }

}
