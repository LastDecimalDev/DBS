import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchFilter',
})
export class searchFilter implements PipeTransform {
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