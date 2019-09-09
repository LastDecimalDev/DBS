import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';

// containers
import { ApplicationformSecComponent } from './applicationform-sec.component';

// routes
export const ROUTES: Routes = [
  { path: '', component: ApplicationformSecComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    ApplicationformSecComponent
  ]
})
export class bsliAppSecModule {}