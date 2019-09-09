import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatAutocompleteModule, MatFormFieldModule} from '@angular/material';
// containers
import { AiaComponent } from './aia.component';
import { OrderByPipeAIA } from '../../../../../app/sharedServices/orderBy';
import { KeysPipeAia } from '../../../../../app/sharedServices/keyValuePipe';

// routes
export const ROUTES: Routes = [
  { path: '', component: AiaComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    AiaComponent,
    OrderByPipeAIA,
    KeysPipeAia
  ]
})
export class AiaLifeModule {}