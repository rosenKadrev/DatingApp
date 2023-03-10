import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
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
    public user: User | undefined;
    public genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }]

    constructor(private memberService: MembersService,
        private accountService: AccountService) {
        this.accountService.currentUser$.pipe(take(1)).subscribe({
            next: user => {
                if (user) {
                    this.userParams = new UserParams(user);
                    this.user = user;
                }
            }
        })
    }

    ngOnInit(): void {
        this.loadMembers();
    }

    public loadMembers() {
        if (!this.userParams) return;
        this.memberService.getMembers(this.userParams).subscribe({
            next: responce => {
                if (responce.result && responce.pagination) {
                    this.members = responce.result;
                    this.pagination = responce.pagination;
                }
            }
        })
    }

    public resetFilters() {
        if (this.user) {
            this.userParams = new UserParams(this.user);
            this.loadMembers();
        }
    }

    public pageChanged(event: any) {
        if (this.userParams && this.userParams?.pageNumber !== event.page) {
            this.userParams.pageNumber = event.page;
            this.loadMembers();
        }
    }
}
