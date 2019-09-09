import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common'



// containers
import { HealthComponent } from './health.component';

// routes
export const ROUTES: Routes = [
  { path: '', component: HealthComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    HealthComponent
  ],
    providers: [DatePipe]

})
export class HealthModule {}