import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';
import { Message } from 'src/app/Utils/interfaces';

@Component({
    selector: 'app-member-messages',
    templateUrl: './member-messages.component.html',
    styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
    @ViewChild('messageForm') messageForm?: NgForm
    @Input() username?: string;
    @Input() messages: Message[] = [];
    public messageContent = '';

    constructor(private messageService: MessageService) { }

    ngOnInit(): void {
    }

    public sendMessage() {
        if (!this.username) return;
        this.messageService.sendMessage(this.username, this.messageContent).subscribe({
            next: message => {
                this.messages.push(message);
                this.messageForm?.reset();
            }
        })
    }
}
