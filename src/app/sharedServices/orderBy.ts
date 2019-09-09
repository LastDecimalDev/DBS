import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: "orderby"
})
export class OrderByPipe {
  transform(array: Array<string>, args: string): Array<string> {
    if (array !== undefined) {  
    array.sort((a: any, b: any) => {
      if (a.value < b.value) {
        return -1;
      } else if (a.value > b.value) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
    }
  }
}

@Pipe({
  name: "orderbyaia"
})
export class OrderByPipeAIA {
  transform(array: Array<string>, args: string): Array<string> {
    if (array !== undefined) {  
    array.sort((a: any, b: any) => {
      if (a.value < b.value) {
        return -1;
      } else if (a.value > b.value) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
    }
  }
}