import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';


// containers
import { SavingTradComponent } from './saving-trad.component';
import { NumberToWordsFilter } from './numberToWordsFilter';

// routes
export const ROUTES: Routes = [
  { path: '', component: SavingTradComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    SavingTradComponent,
    NumberToWordsFilter
  ]
})
export class SavingTradModule {}