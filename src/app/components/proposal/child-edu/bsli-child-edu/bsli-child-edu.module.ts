import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl }   from '@angular/forms';
import { CommonModule } from '@angular/common';
//import { RoundProp } from '../../../../../app/sharedServices/mathRound';

// containers
import { BsliChildEduComponent } from './bsli-child-edu.component';
// routes
export const ROUTES: Routes = [
  { path: '', component: BsliChildEduComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    BsliChildEduComponent,
    //RoundProp
  ]
})
export class bsliChildEduModule {}