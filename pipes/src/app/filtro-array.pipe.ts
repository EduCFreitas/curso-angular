import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroArray',
  //pure: false
})
export class FiltroArrayPipe implements PipeTransform {

  transform(value: any, ...args: any): any {
    if(value.length === 0 || args === undefined){
      return value;
    }

    let filter = args.toLocaleString().toLowerCase();
    return value.filter(
      v => v.toLocaleLowerCase().includes(filter)
    );
  }

}
