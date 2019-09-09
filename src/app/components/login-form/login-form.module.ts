import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

// containers
import { LoginFormComponent } from './login-form.component';

// routes
export const ROUTES: Routes = [
  { path: '', component: LoginFormComponent }
];

@NgModule({
  imports: [
    FormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    LoginFormComponent
  ]
})
export class LoginFormModule {}