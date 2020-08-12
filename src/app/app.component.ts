import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from './services/event.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    
    private subscriptions: Subscription[] = [];
    public visible: boolean = false;
    private count: number = 0;

    constructor(private events: EventService) { }

    ngOnInit() {
        this.subscriptions.push(this.events.uiLoaderShowHide.subscribe((value: boolean) => {
            if (value === true) {
                this.count++;
                this.visible = value;
            }
            if (value === false) {
                this.count--;
                if (this.count <= 0) {
                    this.count = 0;
                    this.visible = value;
                }
            }
        }));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => {
            sub.unsubscribe();
        });
    }
}
