import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';


// containers
import { CriticalIllComponent } from './critical-ill.component';

// routes
export const ROUTES: Routes = [
  { path: '', component: CriticalIllComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    CriticalIllComponent
  ]
})
export class CriticalModule {}