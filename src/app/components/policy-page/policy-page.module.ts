import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
//import { RoundPipe } from '../../sharedServices/mathRound';

// containers
import { PolicyPageComponent } from './policy-page.component';

// routes
export const ROUTES: Routes = [
  { path: '', component: PolicyPageComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    PolicyPageComponent,
   // RoundPipe
  ]
})
export class PolicyPageModule {}