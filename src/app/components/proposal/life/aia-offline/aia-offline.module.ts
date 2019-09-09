import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatAutocompleteModule, MatFormFieldModule} from '@angular/material';
//import { RoundProp } from '../../../../../app/sharedServices/mathRound';
// containers
import { AiaOfflineComponent } from './aia-offline.component';
// routes
export const ROUTES: Routes = [
  { path: '', component: AiaOfflineComponent }
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
    AiaOfflineComponent,
    //RoundProp
  ]
})
export class AiaOfflineModule {}