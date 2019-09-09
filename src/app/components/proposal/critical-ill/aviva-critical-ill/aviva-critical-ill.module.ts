import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl }   from '@angular/forms';
import { CommonModule } from '@angular/common';
//import { RoundProp } from '../../../../../app/sharedServices/mathRound';

// containers
import { AvivaCriticalIllComponent } from './aviva-critical-ill.component';
// routes
export const ROUTES: Routes = [
  { path: '', component: AvivaCriticalIllComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    AvivaCriticalIllComponent,
    //RoundProp
  ]
})
export class AvivaCriticalIllModule {}