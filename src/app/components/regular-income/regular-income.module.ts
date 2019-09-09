import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';

// containers
import { RegularIncomeComponent } from './regular-income.component';
import { NumberToWordsFilter } from './numberToWordsFilter';

// routes
export const ROUTES: Routes = [
  { path: '', component: RegularIncomeComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    RegularIncomeComponent,
    NumberToWordsFilter
  ]
})
export class RegularModule {}