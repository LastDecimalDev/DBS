import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatAutocompleteModule, MatFormFieldModule} from '@angular/material';
//import { RoundProp } from '../../../../../app/sharedServices/mathRound';
// containers
import { BsliOfflineComponent } from './bsli-offline.component';
// routes
export const ROUTES: Routes = [
  { path: '', component: BsliOfflineComponent }
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
    BsliOfflineComponent,
    //RoundProp
  ]
})
export class BsliOfflineModule {}