import { Injectable, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    uiLoaderShowHide: EventEmitter<boolean> = new EventEmitter();

    public updatePackageInfo$: Observable<any>;
    private _updatePackageInfo$: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor() {
        this.updatePackageInfo$ = this._updatePackageInfo$.asObservable();
    }

    public updatePackageInfo(value: any) {
        this._updatePackageInfo$.next(value);
    }
}
