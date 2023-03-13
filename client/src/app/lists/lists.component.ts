import { Component, OnInit } from '@angular/core';
import { MembersService } from '../services/members.service';
import { Member, Pagination } from '../Utils/interfaces';

@Component({
    selector: 'app-lists',
    templateUrl: './lists.component.html',
    styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
    public members: Member[] | undefined;
    public predicate = 'liked';
    public pageNumber = 1;
    pageSize = 5;
    pagination: Pagination | undefined;

    constructor(private memberService: MembersService) { }

    ngOnInit(): void {
        this.loadLikes()
    }

    public loadLikes() {
        this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe({
            next: response => {
                this.members = response.result;
                this.pagination = response.pagination;
            }
        })
    }

    public pageChanged(event: any) {
        if (this.pageNumber !== event.page) {
            this.pageNumber = event.page;
            this.loadLikes();
        }
    }
}
