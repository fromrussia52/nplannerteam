import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private apiUrl: string = 'https://api.github.com/search/repositories';

    constructor(
        private http: HttpClient
    ) { }

    search(value: string): Observable<HttpResponse<Object>> {
        return this.http.get(this.apiUrl, {
            params: new HttpParams({
                fromObject: {
                    q: value
                }
            }),
            observe: 'response'
        });
    }
}
