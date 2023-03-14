import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Message } from '../Utils/interfaces';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    public baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    public getMessages(pageNumber: number, pageSize: number, container: string) {
        let params = getPaginationHeaders(pageNumber, pageSize);
        params = params.append('Container', container);

        return getPaginatedResult<Message[]>(this.baseUrl + 'messages', params, this.http);
    }

    public getMessageThread(username: string) {
        return this.http.get<Message[]>(this.baseUrl + 'messages/thread/' + username);
    }

    public sendMessage(username: string, content: string) {
        return this.http.post<Message>(this.baseUrl + 'messages', { recipientUsername: username, content });
    }

    public deleteMessage(id: number) {
        return this.http.delete(this.baseUrl + 'messages/' + id);
    }
}
