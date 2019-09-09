import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl }   from '@angular/forms';
import { CommonModule } from '@angular/common';
//import { RoundProp } from '../../../../../app/sharedServices/mathRound';

// containers
import { BsliRegularComponent } from './bsli-regular.component';
// routes
export const ROUTES: Routes = [
  { path: '', component: BsliRegularComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    BsliRegularComponent,
    //RoundProp
  ]
})
export class bsliRegularModule {}