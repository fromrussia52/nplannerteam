import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IPackage } from './package.model';
import { ApiService } from '../../services/api.service';
import { NgModel } from '@angular/forms';
import { debounce } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('searchValueModel') searchValueModel: NgModel;
    @ViewChild('filterByPosition') filterByPosition: NgModel;
    @ViewChild('filterByName') filterByName: NgModel;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    displayedColumns: string[] = ['position', 'name'];
    dataSource: MatTableDataSource<IPackage> = null;

    private _subs: Subscription[] = [];
    private _packages: IPackage[] = [];

    constructor(
        private apiService: ApiService,
        private router: Router,
        private eventService: EventService
    ) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this._subs.push(this.searchValueModel.valueChanges.pipe(debounce(_ => interval(500))).subscribe(value => this.getData(value)));

        this._subs.push(this.filterByPosition.valueChanges.pipe(debounce(_ => interval(500))).subscribe(value => this.filter('position', value)));

        this._subs.push(this.filterByName.valueChanges.pipe(debounce(_ => interval(500))).subscribe(value => this.filter('name', value)));
    }

    ngOnDestroy() {
        this._subs.forEach(s => {
            s.unsubscribe();
        });
    }

    private filter(type, value) {
        if (!value || value.trim() === '') {
            this.dataSource = new MatTableDataSource(this._packages);
            this.dataSource.paginator = this.paginator;
            return;
        }
        if (type === 'position') {
            this.filterByName.control.setValue('', { emitEvent: false });
        } else if (type === 'name') {
            this.filterByPosition.control.setValue('', { emitEvent: false });
        }
        const packages = this._packages.filter(el => String(el[type]).indexOf(value) !== -1);
        this.dataSource = new MatTableDataSource(packages);
        this.dataSource.paginator = this.paginator;
    }

    private getData(value) {
        if (!value || value.trim() === '') {
            this.dataSource = null;
            return;
        }

        this._subs.push(this.apiService.search(value).subscribe((data: HttpResponse<Object>) => {
            const packages = ((data.body['items'] || []) as Array<any>).map((el, i) => {
                let pack = { 'position': i, ...el };
                return pack;
            });
            this._packages = packages;
            this.dataSource = new MatTableDataSource(packages);
            this.dataSource.paginator = this.paginator;
        }));
    }

    clickOnRow(row: IPackage) {
        this.eventService.updatePackageInfo(row);
        this.router.navigate(['package', row.name]);
    }

    applyFilter(row) { }
}