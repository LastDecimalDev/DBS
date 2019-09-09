import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl }   from '@angular/forms';
import { CommonModule } from '@angular/common';
//import { RoundProp } from '../../../../../app/sharedServices/mathRound';

// containers
import { AvivaSavingTradComponent } from './aviva-saving-trad.component';
// routes
export const ROUTES: Routes = [
  { path: '', component: AvivaSavingTradComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    AvivaSavingTradComponent,
    //RoundProp
  ]
})
export class AvivaSavingTradModule {}