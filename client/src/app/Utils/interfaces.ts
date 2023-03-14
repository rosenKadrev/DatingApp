export interface User {
    username: string;
    token: string;
    photoUrl: string;
    knownAs: string;
    gender: string;
}
export interface Photo {
    id: number;
    url: string;
    isMain: boolean;
}

export interface Member {
    id: number;
    username: string;
    photoUrl: string;
    age: number;
    knownAs: string;
    created: Date;
    lastActive: Date;
    gender: string;
    introduction: string;
    lookingFor: string;
    interests: string;
    city: string;
    country: string;
    photos: Photo[];
}

export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export interface Message {
    id: number;
    senderId: number;
    senderUsername: string;
    senderPhotoUrl: string;
    recipientId: number;
    recipientUsername: string;
    recipientPhotoUrl?: any;
    content: string;
    dateRead?: Date;
    messageSent: Date;
}

export class PaginatedResult<T> {
    result?: T;
    pagination?: Pagination;
}

export class UserParams {
    gender: string;
    minAge = 18;
    maxAge = 99;
    pageNumber = 1;
    pageSize = 12;
    orderBy = 'lastActive';

    constructor(user: User) {
        this.gender = user.gender === 'female' ? 'male' : 'female';
    }
}
