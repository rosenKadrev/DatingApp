import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member, PaginatedResult, UserParams } from '../Utils/interfaces';

@Injectable({
    providedIn: 'root'
})
export class MembersService {
    public baseUrl = environment.apiUrl;
    public members: Member[] = [];
    public memberCache = new Map();

    constructor(private http: HttpClient) { }

    public getMembers(userParams: UserParams) {
        const response = this.memberCache.get(Object.values(userParams).join('-'));
        if (response) return of(response);

        let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

        params = params.append('minAge', userParams.minAge);
        params = params.append('maxAge', userParams.maxAge);
        params = params.append('gender', userParams.gender);
        params = params.append('orderBy', userParams.orderBy);

        return this.getPaginatedResult<Member[]>(this.baseUrl + 'users', params).pipe(
            map(response => {
                this.memberCache.set(Object.values(userParams).join('-'), response);
                return response;
            })
        );
    }

    private getPaginatedResult<T>(url: string, params: HttpParams) {
        const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>;

        return this.http.get<T>(url, { observe: 'response', params }).pipe(
            map(response => {
                if (response.body) {
                    paginatedResult.result = response.body;
                }
                const pagination = response.headers.get('Pagination');
                if (pagination) {
                    paginatedResult.pagination = JSON.parse(pagination);
                }
                return paginatedResult;
            })
        );
    }

    private getPaginationHeaders(pageNumber: number, pageSize: number) {
        let params = new HttpParams();
        params = params.append('pageNumber', pageNumber);
        params = params.append('pageSize', pageSize);

        return params;
    }

    public getMember(username: string) {
        const member = this.members.find(user => user.username === username);
        if (member) return of(member);
        return this.http.get<Member>(this.baseUrl + 'users/' + username);
    }

    public updateMember(member: Member) {
        return this.http.put(this.baseUrl + 'users', member).pipe(
            map(() => {
                const index = this.members.indexOf(member);
                this.members[index] = { ...this.members[index], ...member }
            })
        );
    }

    public setMainPhoto(photoId: number) {
        return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
    }

    public deletePhoto(photoId: number) {
        return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
    }
}
