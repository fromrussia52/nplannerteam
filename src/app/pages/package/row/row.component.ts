import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-package-row',
    templateUrl: './row.component.html',
    styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit {

    @Input() row: { key: string; value: any } = null;

    constructor() { }

    ngOnInit(): void {
    }

}
