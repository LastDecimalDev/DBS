import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ManageUserCreationComponent } from './manage-user-creation.component';
import { SearchFilterModule } from './search-filter/search-filter.module';

export const ROUTES: Routes = [
  { path: '', component: ManageUserCreationComponent }
];

@NgModule({
  imports: [
    NgxPaginationModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    ManageUserCreationComponent,
    SearchFilterModule

     ]
})
export class ManageUserCreationModule {}