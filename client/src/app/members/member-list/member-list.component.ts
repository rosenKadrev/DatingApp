import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/services/members.service';
import { Member } from 'src/app/Utils/interfaces';

@Component({
    selector: 'app-member-list',
    templateUrl: './member-list.component.html',
    styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
    public members: Member[] = [];

    constructor(private memberService: MembersService) { }

    ngOnInit(): void {
        this.loadMembers();
    }

    public loadMembers() {
        this.memberService.getMembers().subscribe({
            next: members => this.members = members
        })
    }

}
