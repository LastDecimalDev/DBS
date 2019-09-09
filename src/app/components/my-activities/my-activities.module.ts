import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

//import { AppHeaderComponent } from '../../components/common/app-header/app-header.component';
//import { AppFooterComponent } from '../../components/common/app-footer/app-footer.component';
// containers
import { MyActivitiesComponent } from './my-activities.component';

// routes
export const ROUTES: Routes = [
  { path: '', component: MyActivitiesComponent }
];

@NgModule({
  imports: [
    NgxPaginationModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    MyActivitiesComponent,
   // AppHeaderComponent,
    //AppFooterComponent
  ]
})
export class MyActivitiesModule {}