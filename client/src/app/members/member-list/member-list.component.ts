import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/services/members.service';
import { Member, Pagination, User, UserParams } from 'src/app/Utils/interfaces';

@Component({
    selector: 'app-member-list',
    templateUrl: './member-list.component.html',
    styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
    public members: Member[] = [];
    public pagination: Pagination | undefined;
    public userParams: UserParams | undefined;
    public genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }]

    constructor(private memberService: MembersService) {
        this.userParams = this.memberService.getUserParams();
    }

    ngOnInit(): void {
        this.loadMembers();
    }

    public loadMembers() {
        if (this.userParams) {
            this.memberService.setUserParams(this.userParams);
            this.memberService.getMembers(this.userParams).subscribe({
                next: responce => {
                    if (responce.result && responce.pagination) {
                        this.members = responce.result;
                        this.pagination = responce.pagination;
                    }
                }
            })
        }
    }

    public resetFilters() {
        this.userParams = this.memberService.resetUserParams();
        this.loadMembers();
    }

    public pageChanged(event: any) {
        if (this.userParams && this.userParams?.pageNumber !== event.page) {
            this.userParams.pageNumber = event.page;
            this.memberService.setUserParams(this.userParams);
            this.loadMembers();
        }
    }
}
