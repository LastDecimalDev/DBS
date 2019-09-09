import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl }   from '@angular/forms';
import { CommonModule } from '@angular/common';
//import { RoundProp } from '../../../../../app/sharedServices/mathRound';

// containers
import { BsliSavingTradComponent } from './bsli-saving-trad.component';
// routes
export const ROUTES: Routes = [
  { path: '', component: BsliSavingTradComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    BsliSavingTradComponent,
    //RoundProp
  ]
})
export class bsliSavingTradModule {}