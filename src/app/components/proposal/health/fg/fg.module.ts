import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { keysFGHealth } from '../../../../sharedServices/keyValuePipe';

import { HealthfgComponent } from './fg.component';

// routes
export const ROUTES: Routes = [
  { path: '', component: HealthfgComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    keysFGHealth,
    HealthfgComponent
  ]
})
export class FgHealthModule {}
