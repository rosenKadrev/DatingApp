import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { LoginReq, LoginRes, RegisterRes } from '../Utils/interfaces';


@Injectable({
    providedIn: 'root'
})
export class AccountService {
    baseUrl = 'https://localhost:5001/api/'
    private currentUserState = new BehaviorSubject<LoginRes | null>(null);
    currentUser$ = this.currentUserState.asObservable();

    constructor(private http: HttpClient) { }

    public login(model: LoginReq) {
        return this.http.post<LoginRes>(this.baseUrl + 'account/login', model).pipe(
            map((res: LoginRes) => {
                const user = res;
                if (user) {
                    localStorage.setItem('userCredentials', JSON.stringify(user));
                    this.currentUserState.next(user);
                }
            })
        );
    }

    public register(model: any) {
        return this.http.post<RegisterRes>(this.baseUrl + 'account/register', model).pipe(
            map((res: RegisterRes) => {
                const user = res;
                if (user) {
                    localStorage.setItem('userCredentials', JSON.stringify(user));
                    this.currentUserState.next(user);
                }
            })
        );
    }

    public setCurrentUser(user: LoginRes) {
        this.currentUserState.next(user);
    }

    public logout() {
        localStorage.removeItem('userCredentials');
        this.currentUserState.next(null);
    }
}
