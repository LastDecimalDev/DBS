import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl }   from '@angular/forms';
import { CommonModule } from '@angular/common';


// containers
import { AvivaCarComponent } from './aviva-car.component';
// routes
export const ROUTES: Routes = [
  { path: '', component: AvivaCarComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    AvivaCarComponent
  ]
})
export class AvivaCarInsuModule {}