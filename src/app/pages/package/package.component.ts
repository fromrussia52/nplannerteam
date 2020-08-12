import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-package',
    templateUrl: './package.component.html',
    styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit, OnDestroy {

    private _subs: Subscription[] = [];
    public values: any = [];
    public packageName: string = null;

    constructor(
        private eventService: EventService,
        private router: Router,
        private activedRoute: ActivatedRoute
    ) {
        this._subs.push(this.activedRoute.params.subscribe(params => {
            if (params.name) {
                this.packageName = params.name;
            }
        }));

        this._subs.push(this.eventService.updatePackageInfo$.subscribe(values => {
            if (!values) {
                this.router.navigate(['']);
                return;
            }
            this.values = values;
        }));
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
        this._subs.forEach(s => {
            s.unsubscribe();
        });
    }
}
