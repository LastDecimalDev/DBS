import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';

// containers
import { HealthroyalSundaramComponent } from './royal-sundaram.component';

// routes
export const ROUTES: Routes = [
  { path: '', component: HealthroyalSundaramComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    HealthroyalSundaramComponent
    
  ]
})
export class RsaHealthModule {}