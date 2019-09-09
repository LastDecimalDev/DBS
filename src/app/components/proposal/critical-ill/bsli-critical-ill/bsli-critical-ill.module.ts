import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl }   from '@angular/forms';
import { CommonModule } from '@angular/common';
//import { RoundProp } from '../../../../../app/sharedServices/mathRound';

// containers
import { BsliCriticalIllComponent } from './bsli-critical-ill.component';
// routes
export const ROUTES: Routes = [
  { path: '', component: BsliCriticalIllComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    BsliCriticalIllComponent,
    //RoundProp
  ]
})
export class bsliCriticalIllModule {}