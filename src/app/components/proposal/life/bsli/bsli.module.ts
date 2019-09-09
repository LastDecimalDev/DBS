import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule, MatSelectModule,MatAutocompleteModule} from '@angular/material';
import { TrimValueAccessor } from '../../../../../app/sharedServices/trim-value-accessor';
import { BsliComponent } from './bsli.component';
//import { RoundProp } from '../../../../../app/sharedServices/mathRound';
import { OrderByPipe } from '../../../../../app/sharedServices/orderBy';
// routes
export const ROUTES: Routes = [
  { path: '', component: BsliComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    BsliComponent,
   TrimValueAccessor,
   OrderByPipe,
   //RoundProp
 
  ],
  exports: [ TrimValueAccessor ]
})
export class BsliLifeModule {}