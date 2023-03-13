import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from 'src/app/services/members.service';
import { Member } from 'src/app/Utils/interfaces';

@Component({
    selector: 'app-member-card',
    templateUrl: './member-card.component.html',
    styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
    @Input() member: Member | undefined;

    constructor(private memberService: MembersService,
        private toastr: ToastrService) { }

    ngOnInit(): void {
    }

    public addLike(member: Member) {
        this.memberService.addLike(member.username).subscribe({
            next: () => this.toastr.success('You have liked ' + member.knownAs)
        })
    }

}
