import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../Utils/interfaces';


@Injectable({
    providedIn: 'root'
})
export class AccountService {
    baseUrl = environment.apiUrl;
    private currentUserState = new BehaviorSubject<User | null>(null);
    currentUser$ = this.currentUserState.asObservable();

    constructor(private http: HttpClient) { }

    public login(model: any) {
        return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
            map((res: User) => {
                const user = res;
                if (user) {
                    this.setCurrentUser(user);
                }
            })
        );
    }

    public register(model: any) {
        return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
            map((res: User) => {
                const user = res;
                if (user) {
                    this.setCurrentUser(user);
                }
            })
        );
    }

    public setCurrentUser(user: User) {
        localStorage.setItem('userCredentials', JSON.stringify(user));
        this.currentUserState.next(user);
    }

    public logout() {
        localStorage.removeItem('userCredentials');
        this.currentUserState.next(null);
    }
}
