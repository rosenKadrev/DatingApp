import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { User } from 'src/app/Utils/interfaces';

@Component({
    selector: 'app-user-manegment',
    templateUrl: './user-manegment.component.html',
    styleUrls: ['./user-manegment.component.css']
})
export class UserManegmentComponent implements OnInit {
    public users: User[] = [];
    constructor(private adminService: AdminService) { }

    ngOnInit(): void {
        this.getUsersWithRoles();
    }

    public getUsersWithRoles() {
        this.adminService.getUsersWithRoles().subscribe({
            next: users => this.users = users
        })
    }
}
