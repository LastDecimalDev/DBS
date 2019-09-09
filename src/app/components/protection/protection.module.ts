import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';

// containers
import { ProtectionComponent } from './protection.component';
import { NumberToWordsFilter } from './numberToWordsFilter';

// routes
export const ROUTES: Routes = [
  { path: '', component: ProtectionComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    ProtectionComponent,
    NumberToWordsFilter
  ]
})
export class ProtectionModule {}