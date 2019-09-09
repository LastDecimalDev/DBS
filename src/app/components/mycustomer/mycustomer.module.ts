import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';


import { searchFilter } from './searchFilter';
// containers
import { MycustomerComponent } from './mycustomer.component';

// routes
export const ROUTES: Routes = [
  { path: '', component: MycustomerComponent }
];

@NgModule({
  imports: [
    NgxPaginationModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    MycustomerComponent,
    searchFilter
  ]
})
export class MyCustomerModule {}