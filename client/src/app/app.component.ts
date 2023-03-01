import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginRes, User } from './Utils/interfaces';
import { AccountService } from './services/account.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    public users: any;

    constructor(private http: HttpClient,
        private accountService: AccountService) { }

    ngOnInit() {
        this.getAllUsers();
        this.setCurrentUser();
    }

    public getAllUsers() {
        this.http.get('https://localhost:5001/api/users').subscribe({
            next: response => this.users = response,
            error: error => console.log(error),
            complete: () => console.log('Request complete')
        });
    }

    public setCurrentUser() {
        const userStr = localStorage.getItem('userCredentials');
        if (!userStr) return;
        const user: LoginRes = JSON.parse(userStr);
        this.accountService.setCurrentUser(user);
    }
}
