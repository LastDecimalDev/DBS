import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';

// containers
import { ChildEduComponent } from './child-edu.component';
import { NumberToWordsFilter } from './numberToWordsFilter';

// routes
export const ROUTES: Routes = [
  { path: '', component: ChildEduComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    ChildEduComponent,
    NumberToWordsFilter
  ]
})
export class ChildEduModule {}