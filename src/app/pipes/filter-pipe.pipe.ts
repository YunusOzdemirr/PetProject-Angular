import { Pipe, PipeTransform } from '@angular/core';
import { Pet } from '../models/pet';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Pet[], filterText: string): Pet[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : "";
    return filterText ? value
      .filter((p: Pet) => p.name.toLocaleLowerCase().indexOf(filterText) !== -1) : value;
  }
}
