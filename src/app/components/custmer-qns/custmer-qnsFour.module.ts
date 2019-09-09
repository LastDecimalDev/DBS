import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';

// containers
import { CustmerQnsFourComponent } from './custmer-qnsFour.component';

// routes
export const ROUTES: Routes = [
  { path: '', component: CustmerQnsFourComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    CustmerQnsFourComponent
  ]
})
export class CustmerFourPlanModule {}