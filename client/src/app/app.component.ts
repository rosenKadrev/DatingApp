import { Component, OnInit } from '@angular/core';
import { User } from './Utils/interfaces';
import { AccountService } from './services/account.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

    constructor(private accountService: AccountService) { }

    ngOnInit() {
        this.setCurrentUser();
    }

    public setCurrentUser() {
        const userStr = localStorage.getItem('userCredentials');
        if (!userStr) return;
        const user: User = JSON.parse(userStr);
        this.accountService.setCurrentUser(user);
    }
}
