import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Observable, of } from 'rxjs';
import { LoginRes } from '../Utils/interfaces';


@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
    public model: any = {}

    constructor(public accountService: AccountService) { }

    ngOnInit(): void {
    }

    public login() {
        this.accountService.login(this.model).subscribe({
            next: responce => {
                console.log(responce);
            },
            error: error => console.log(error)
        })
    }

    public logout() {
        this.accountService.logout()
    }

}
