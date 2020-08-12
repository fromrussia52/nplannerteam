import { NgModule } from '@angular/core';
import { PackageComponent } from './package.component';
import { Routes, RouterModule } from '@angular/router';
import { AppSharedModule } from 'src/app/app-shared.module';
import { RowComponent } from './row/row.component';

const routes: Routes = [{
    path: '',
    component: PackageComponent
}]

@NgModule({
    declarations: [
        PackageComponent,
        RowComponent
    ],
    imports: [
        AppSharedModule,
        RouterModule.forChild(routes)
    ]
})
export class PackageModule { }
