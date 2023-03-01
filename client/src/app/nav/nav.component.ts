import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
    public model: any = {}
    loggedIn = false;

    constructor(private accountService: AccountService) { }

    ngOnInit(): void {
        this.getCurrentUser();
    }

    public getCurrentUser() {
        this.accountService.currentUser$.subscribe({
            next: user => this.loggedIn = !!user,
            error: error => console.log(error)
        })
    }

    public login() {
        console.log(this.model);
        this.accountService.login(this.model).subscribe({
            next: responce => {
                console.log(responce);
                this.loggedIn = true;
            },
            error: error => console.log(error)
        })
    }

    public logout() {
        this.accountService.logout()
        this.loggedIn = false;
    }

}
