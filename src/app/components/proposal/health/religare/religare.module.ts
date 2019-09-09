import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppHeaderComponent } from '../../../../components/common/app-header/app-header.component';
import { AppFooterComponent } from '../../../../components/common/app-footer/app-footer.component';
// containers
import { ReligareComponent } from './religare.component';

// routes
export const ROUTES: Routes = [
  { path: '', component: ReligareComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    ReligareComponent,
    AppHeaderComponent,
    AppFooterComponent
  ]
})
export class ReligareHealthModule {}