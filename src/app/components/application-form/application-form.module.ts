import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';

// containers
import { ApplicationFormComponent } from './application-form.component';

// routes
export const ROUTES: Routes = [
  { path: '', component: ApplicationFormComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    ApplicationFormComponent
  ]
})
export class bsliAppModule {}