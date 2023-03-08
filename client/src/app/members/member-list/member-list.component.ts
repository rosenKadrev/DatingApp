import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MembersService } from 'src/app/services/members.service';
import { Member } from 'src/app/Utils/interfaces';

@Component({
    selector: 'app-member-list',
    templateUrl: './member-list.component.html',
    styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
    public members$: Observable<Member[]> | undefined;

    constructor(private memberService: MembersService) { }

    ngOnInit(): void {
        this.members$ = this.memberService.getMembers();
    }

}
