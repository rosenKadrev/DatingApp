import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';
import { Member, Photo, User } from 'src/app/Utils/interfaces';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-photo-editor',
    templateUrl: './photo-editor.component.html',
    styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
    @Input() member: Member | undefined;
    public uploader: FileUploader | undefined;
    public hasBaseDropZoneOver = false;
    public baseUrl = environment.apiUrl;
    public user: User | undefined;

    constructor(private accountService: AccountService,
        private memberService: MembersService) {
        this.accountService.currentUser$.pipe(take(1)).subscribe({
            next: user => {
                if (user) this.user = user;
            }
        })
    }

    ngOnInit(): void {
        this.initalizeUploader();
    }

    public fileOverBase(event: any) {
        this.hasBaseDropZoneOver = event;
    }

    public setMainPhoto(photo: Photo) {
        this.memberService.setMainPhoto(photo.id).subscribe({
            next: () => {
                if (this.user && this.member) {
                    this.user.photoUrl = photo.url;
                    this.accountService.setCurrentUser(this.user);
                    this.member.photoUrl = photo.url;
                    this.member.photos.forEach(p => {
                        if (p.isMain) p.isMain = false;
                        if (p.id === photo.id) p.isMain = true;
                    })
                }
            }
        });
    }

    public deletePhoto(photoId: number) {
        this.memberService.deletePhoto(photoId).subscribe({
            next: () => {
                if (this.member) {
                    this.member.photos = this.member.photos.filter(p => p.id !== photoId);
                }
            }
        })
    }

    public initalizeUploader() {
        this.uploader = new FileUploader({
            url: this.baseUrl + 'users/add-photo',
            authToken: 'Bearer ' + this.user?.token,
            isHTML5: true,
            allowedFileType: ['image'],
            removeAfterUpload: true,
            autoUpload: false,
            maxFileSize: 10 * 1024 * 1024
        });

        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        }

        this.uploader.onSuccessItem = (item, response, status, headers) => {
            if (response) {
                const photo = JSON.parse(response);
                this.member?.photos.push(photo);
                if (photo.isMain && this.user && this.member) {
                    this.user.photoUrl = photo.url;
                    this.member.photoUrl = photo.url;
                    this.accountService.setCurrentUser(this.user);
                }
            }
        }
    }
}
