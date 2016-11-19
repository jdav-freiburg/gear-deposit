import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Item } from '../model/item';

@Injectable()
@Pipe({
    name: 'jgdItemFilter'
})
export class ItemFilterPipe implements PipeTransform {

    private contains(target: string, texts: string[]): boolean {
        let contained = 0;
        texts.forEach((text: string) => {
            if (target.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) !== -1) {
                contained++;
            }
        });
        return contained === texts.length;
    }

    transform(items: Item[], filter: string, maxItems?: number): any {
        let filtered: Item[];
        let filterStrings = false;
        let filters: string[];

        if (items === undefined) {
            return items;
        }

        // ensuring valid filter params
        filter = filter === undefined ? '' : filter;
        maxItems = maxItems === undefined ? -1 : maxItems;

        filter = filter.trim();
        filterStrings = filter.length > 0;
        filters = filter.split(' ');

        filtered = items.filter((item: Item) => {
            return (!filterStrings || (
            (filterStrings && this.contains(item.type, filters)) ||
            (filterStrings && this.contains(item.description, filters))));
        });

        return (maxItems >= 0) ? filtered.slice(0, maxItems) : filtered;
    }

}
