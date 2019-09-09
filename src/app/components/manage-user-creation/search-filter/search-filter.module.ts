import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
@Pipe({
  name: 'searchFilter',
})
export class SearchFilterModule {
  transform(items: any[], searchText: any): any {

       
    return items.filter(item =>{
       for (let key in item ) {
         if((""+item[key]).toLowerCase().includes(searchText.toLowerCase())){
            return true;
         }
       }
       return false;
    });
}
 }
