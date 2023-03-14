import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery/public-api';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { MembersService } from 'src/app/services/members.service';
import { MessageService } from 'src/app/services/message.service';
import { Member, Message } from 'src/app/Utils/interfaces';

@Component({
    selector: 'app-member-detail',
    templateUrl: './member-detail.component.html',
    styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
    @ViewChild('memberTabs', { static: true }) memberTabs?: TabsetComponent;
    public member: Member = {} as Member;
    public galleryOptions: NgxGalleryOptions[] = [];
    public galleryImages: NgxGalleryImage[] = [];
    public activeTab?: TabDirective;
    public messages: Message[] = [];

    constructor(private memberService: MembersService,
        private route: ActivatedRoute,
        private messageService: MessageService) { }

    ngOnInit(): void {
        this.route.data.subscribe({
            next: data => this.member = data['member']
        })

        this.route.queryParams.subscribe({
            next: params => {
                params['tab'] && this.selectTab(params['tab'])
            }
        })

        this.galleryOptions = [
            {
                width: '500px',
                height: '500px',
                imagePercent: 100,
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide,
                preview: false
            }
        ]

        this.galleryImages = this.getImages();
    }

    public getImages() {
        if (!this.member) return [];
        const imgUrls = [];
        for (const photo of this.member.photos) {
            imgUrls.push({
                small: photo.url,
                medium: photo.url,
                large: photo.url,
            })
        }
        return imgUrls;
    }

    public loadMessages() {
        if (this.member) {
            this.messageService.getMessageThread(this.member.username).subscribe({
                next: messages => this.messages = messages
            })
        }
    }

    public onTabActivated(data: TabDirective) {
        this.activeTab = data;
        if (this.activeTab.heading === 'Messages') {
            this.loadMessages();
        }
    }

    public selectTab(heading: string) {
        if (this.memberTabs) {
            this.memberTabs.tabs.find(x => x.heading === heading)!.active = true;
        }
    }

}
