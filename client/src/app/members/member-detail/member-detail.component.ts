import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery/public-api';
import { MembersService } from 'src/app/services/members.service';
import { Member } from 'src/app/Utils/interfaces';

@Component({
    selector: 'app-member-detail',
    templateUrl: './member-detail.component.html',
    styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
    public member: Member | undefined;
    public galleryOptions: NgxGalleryOptions[] = [];
    public galleryImages: NgxGalleryImage[] = [];

    constructor(private memberService: MembersService,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.loadMember();
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

    public loadMember() {
        const username = this.route.snapshot.paramMap.get('username');
        if (!username) return;
        this.memberService.getMember(username).subscribe({
            next: member => {
                this.member = member;
                this.galleryImages = this.getImages();
            }
        })
    }

}
