import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl }   from '@angular/forms';
import { CommonModule } from '@angular/common';
//import { RoundProp } from '../../../../../app/sharedServices/mathRound';

// containers
import { TataSavingTradComponent } from './tata-saving-trad.component';
// routes
export const ROUTES: Routes = [
  { path: '', component: TataSavingTradComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    TataSavingTradComponent,
    //RoundProp
  ]
})
export class tataSavingTradModule {}