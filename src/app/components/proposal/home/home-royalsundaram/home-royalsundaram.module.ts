import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';

// containers
import { HomeRoyalsundaramComponent } from './home-royalsundaram.component';

// routes
export const ROUTES: Routes = [
  { path: '', component: HomeRoyalsundaramComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    HomeRoyalsundaramComponent,
  
  ]
})
export class HomeRsaModule {}