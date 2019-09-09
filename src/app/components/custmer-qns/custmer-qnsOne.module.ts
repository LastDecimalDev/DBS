import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';

// containers
import { CustmerQnsOneComponent } from './custmer-qnsOne.component';

// routes
export const ROUTES: Routes = [
  { path: '', component: CustmerQnsOneComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    CustmerQnsOneComponent
  ]
})
export class CustmerOnePlanModule {}