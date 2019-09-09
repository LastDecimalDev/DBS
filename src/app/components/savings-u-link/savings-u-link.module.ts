import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';


// containers
import { SavingsULinkComponent } from './savings-u-link.component';
import { NumberToWordsFilter } from './numberToWordsFilter';

// routes
export const ROUTES: Routes = [
  { path: '', component: SavingsULinkComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    SavingsULinkComponent,
    NumberToWordsFilter
  ]
})
export class SavingsLinkModule {}