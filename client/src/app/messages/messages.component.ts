import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Message, Pagination } from '../Utils/interfaces';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
    public messages?: Message[];
    public pagination?: Pagination;
    public container = 'Unread';
    public pageNumber = 1;
    public pageSize = 5;
    public loading = false;

    constructor(private messageService: MessageService) { }

    ngOnInit(): void {
        this.loadMessages();
    }

    public loadMessages() {
        this.loading = true;
        this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe({
            next: response => {
                this.messages = response.result;
                this.pagination = response.pagination;
                this.loading = false;
            }
        })
    }

    public deleteMessage(id: number) {
        this.messageService.deleteMessage(id).subscribe({
            next: () => this.messages?.splice(this.messages.findIndex(m => m.id === id, 1))
        })
    }

    public pageChanged(event: any) {
        if (this.pageNumber !== event.page) {
            this.pageNumber = event.page;
            this.loadMessages();
        }
    }
}
