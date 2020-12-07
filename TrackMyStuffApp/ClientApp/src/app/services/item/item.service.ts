import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    private itemUrl: string;

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') baseUrl: string
    )
    {
        this.itemUrl = baseUrl + 'api/item';
    }

    getItems(): Observable<Item[]> {
        return this.http.get<Item[]>(this.itemUrl);
    }

    addItem(item: Item): Observable<Item> {
        return this.http.post<Item>(this.itemUrl, item);
    }
}

export interface Item {
    Id?: number;
    Name: string;
    Location: string;
    Description: string;
    ExpirationDate?: Date;
}
