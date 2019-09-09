import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl }   from '@angular/forms';
import { CommonModule } from '@angular/common';
//import { RoundProp } from '../../../../../app/sharedServices/mathRound';

// containers
import {  BsliSavingUnitComponent } from './bsli-saving-unit.component';
// routes
export const ROUTES: Routes = [
  { path: '', component: BsliSavingUnitComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    BsliSavingUnitComponent,
    //RoundProp
  ]
})
export class bsliSavingUnitModule {}