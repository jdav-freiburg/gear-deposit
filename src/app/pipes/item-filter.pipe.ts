import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Item } from '../model/item';

export const MAX_ITEM_PATTERN = /((\d*)(x\s*))?(.*)/;

@Injectable()
@Pipe({
    name: 'jgdItemFilter'
})
export class ItemFilterPipe implements PipeTransform {

    private contains(target: string, text: string): boolean {
        return target.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) !== -1;
    }

    transform(items: Item[], filter: string, flagged: boolean): any {
        let filtered: Item[];
        let filterStrings: boolean = false;
        let splittedFilter: string[];
        let maxItems: number = -1;

        if (items === undefined) {
            return items;
        }

        if ((filter === undefined || filter.trim().length === 0) && !flagged) {
            return items;
        }

        if (filter !== undefined) {
            filter = filter.trim();
            splittedFilter = MAX_ITEM_PATTERN.exec(filter);
            if (splittedFilter[2] !== undefined) {
                maxItems = Number.parseInt(splittedFilter[2]);
                filter = splittedFilter[4];
            }
            filterStrings = filter.length > 0;
        }

        filtered = items.filter((item: Item) => {
            return (!filterStrings || (
                (filterStrings && this.contains(item.type, filter)) ||
                (filterStrings && this.contains(item.description, filter))))
                && (!flagged || (!!flagged && !!item.flagged));
        });

        return (maxItems >= 0) ? filtered.slice(0, maxItems) : filtered;
    }

}
