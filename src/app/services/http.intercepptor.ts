import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { EventService } from './event.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(
        private events: EventService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        this.events.uiLoaderShowHide.emit(true);

        return next.handle(req).pipe(
            tap(evnt => {
            }),
            catchError((err: any) => {
                return throwError(err);
            }),
            finalize(() => {
                this.events.uiLoaderShowHide.emit(false);
            }));
    }
}