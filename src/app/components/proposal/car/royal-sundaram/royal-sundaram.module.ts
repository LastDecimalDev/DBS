import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';

// containers
import { RoyalSundaramComponent } from './royal-sundaram.component';

// routes
export const ROUTES: Routes = [
  { path: '', component: RoyalSundaramComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    RoyalSundaramComponent
  ]
})
export class RsaCarModule {}