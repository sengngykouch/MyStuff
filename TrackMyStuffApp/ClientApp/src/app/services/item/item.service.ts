import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
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
    ) {
        this.itemUrl = baseUrl + 'api/item';
    }

    getItems(): Observable<Item[]> {
        return this.http.get<Item[]>(this.itemUrl)
            .pipe(
                catchError(this.handleError)
            );
    }

    addItem(item: Item): Observable<Item> {
        return this.http.post<Item>(this.itemUrl, item)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateItem(item: Item): Observable<any> {
        let url = `${this.itemUrl}/${item.id}`;
        return this.http.put(url, item, { observe: 'response' })
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteItem(id: number): Observable<any> {
        let url = `${this.itemUrl}/${id}`;
        return this.http.delete(url, { observe: 'response' })
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred: ', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`
            );
        }

        return throwError(
            'Something bad happened. Please try again later.'
        );
    }
}

export interface Item {
    id?: number;
    name: string;
    location: string;
    description: string;
    picture: string;
    expirationDate?: Date;
}
