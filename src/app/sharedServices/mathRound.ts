import {Pipe, PipeTransform} from "@angular/core";
 
@Pipe({name: 'round'})
export class RoundPipe implements PipeTransform {
    
    transform(value: number): number {
        return Math.round(value);
    }
}
@Pipe({name: 'roundPipe'})
export class RoundProp implements PipeTransform {
    
    transform(value: number): number {
        return Math.round(value);
    }
}