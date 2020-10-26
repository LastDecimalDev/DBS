import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { OrderByPipe } from '../../../../../app/sharedServices/orderBy';
import { KeysPipe } from '../../../../sharedServices/keyValuePipe';
// containers
import { FgComponent } from './fg.component';

// routes
export const ROUTES: Routes = [
  { path: '', component: FgComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatSelectModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    FgComponent,
    OrderByPipe,
    KeysPipe
  ]
})
export class FgCarModule {}
