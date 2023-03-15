import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../Utils/interfaces';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    public baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    public getUsersWithRoles() {
        return this.http.get<User[]>(this.baseUrl + 'admin/users-with-roles')
    }
}
