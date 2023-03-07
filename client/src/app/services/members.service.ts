import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../Utils/interfaces';

@Injectable({
    providedIn: 'root'
})
export class MembersService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }


    public getMembers() {
        return this.http.get<Member[]>(this.baseUrl + 'users', this.getHttpOptions())
    }

    public getMember(username: string) {
        return this.http.get<Member>(this.baseUrl + 'users' + username, this.getHttpOptions())
    }

    public getHttpOptions() {
        const userStr = localStorage.getItem('userCredentials');
        if (!userStr) return;
        const user = JSON.parse(userStr);
        return {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + user.token
            })
        }
    }
}
