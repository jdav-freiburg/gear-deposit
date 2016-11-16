import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../model/item';

@Pipe({
    name: 'jgdItemFilter'
})
export class ItemFilterPipe implements PipeTransform {

    private contains(target: string, text: string): boolean {
        return target.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) !== -1;
    }

    transform(items: Item[], filter: string, flagged: boolean): any {
        if (items === undefined) {
            return items;
        }

        if ((filter === undefined || filter.trim().length === 0) && !flagged) {
            return items;
        }

        let filterStrings = filter !== undefined && filter.trim().length > 0;
        return items.filter((item: Item) => {
            return (!filterStrings || (
                (filterStrings && this.contains(item.type, filter)) ||
                (filterStrings && this.contains(item.description, filter))))
                && (!flagged || (!!flagged && !!item.flagged));
        });
    }

}
