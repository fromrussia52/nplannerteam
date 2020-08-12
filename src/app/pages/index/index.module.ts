import { NgModule } from '@angular/core';
import { IndexComponent } from './index.component';
import { Routes, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppSharedModule } from 'src/app/app-shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{
    path: '',
    component: IndexComponent
}]

@NgModule({
    declarations: [IndexComponent],
    imports: [
        AppSharedModule,
        RouterModule.forChild(routes),
        MatInputModule,
        MatFormFieldModule,
        MatTableModule,
        MatPaginatorModule,
        FormsModule
    ]
})
export class IndexModule { }
