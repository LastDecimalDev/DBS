import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl }   from '@angular/forms';
import { CommonModule } from '@angular/common';
//import { RoundProp } from '../../../../../app/sharedServices/mathRound';

// containers
import { TataCriticalIllComponent } from './tata-critical-ill.component';
// routes
export const ROUTES: Routes = [
  { path: '', component: TataCriticalIllComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    TataCriticalIllComponent,
    //RoundProp
  ]
})
export class tataCriticalIllModule {}