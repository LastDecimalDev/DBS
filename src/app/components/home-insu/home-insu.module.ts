import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';

// containers
import { HomeInsuComponent } from './home-insu.component';

// routes
export const ROUTES: Routes = [
  { path: '', component: HomeInsuComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    HomeInsuComponent
  ]
})
export class HomeInsuModule {}