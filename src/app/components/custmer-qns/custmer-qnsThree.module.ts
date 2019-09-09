import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';

// containers
import { CustmerQnsThreeComponent } from './custmer-qnsThree.component';

// routes
export const ROUTES: Routes = [
  { path: '', component: CustmerQnsThreeComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    CustmerQnsThreeComponent
  ]
})
export class CustmerThreePlanModule {}