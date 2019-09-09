import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';

// containers
import { CustmerQnsTwoComponent } from './custmer-qnsTwo.component';

// routes
export const ROUTES: Routes = [
  { path: '', component: CustmerQnsTwoComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    CustmerQnsTwoComponent
  ]
})
export class CustmerTwoPlanModule {}