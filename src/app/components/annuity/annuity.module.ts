import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AnnuityComponent } from './annuity.component';
import { NumberToWordsFilter } from './numberToWordsFilter';
// routes
export const ROUTES: Routes = [
  { path: '', component: AnnuityComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    AnnuityComponent,
    NumberToWordsFilter
  ]
})
export class AnnuityInsuModule {}