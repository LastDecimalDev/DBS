import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { searchFilter } from './searchFilter';
import { DatePipe } from '@angular/common'


// containers
import { CarInsuComponent } from './car-insu.component';

// routes
export const ROUTES: Routes = [
  { path: '', component: CarInsuComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    CarInsuComponent,
    searchFilter
  
  ],
  providers: [DatePipe]

})
export class CarInsuModule {}