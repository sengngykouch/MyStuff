import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ImageService {

    private imageUrl: string;

    constructor(private http: HttpClient,
        @Inject('BASE_URL') baseUrl: string) {
        this.imageUrl = baseUrl + 'api/image';
    }

    getImage(fileName: string): Observable<Blob> {
        let url = this.imageUrl + `/${fileName}`;
        return this.http.get(url, { responseType: 'blob' });
    }

    addImage(file: File): Observable<any> {
        let formData = new FormData();
        formData.append('image', file);
        return this.http.post(this.imageUrl, formData);
    }

    updateImage(fileName: string, file: File): Observable<any> {
        let url = this.imageUrl + `/${fileName}`
        let formData = new FormData();
        formData.append('image', file);
        return this.http.put(url, formData);
    }

    deleteImage(fileName: string): Observable<any> {
        let url = this.imageUrl + `/${fileName}`;
        return this.http.delete(url);
    }
}
