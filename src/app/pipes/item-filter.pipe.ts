import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Item } from '../model/item';

/**
 * Filters a list of items with given filter pattern (space separated query list).
 *
 * Each item will be checked whether a match is found in its `type`, `description` or `labels`.
 * If the filter contains multiple queries (with space separated), each one needs to match on one the items attributes
 * to fulfill the condition.
 */
@Injectable()
@Pipe({
    name: 'jgdItemFilter'
})
export class ItemFilterPipe implements PipeTransform {

    private isMatching(item: Item, filters: string[]): boolean {
        let matches = 0;
        filters.forEach((filter: string, index: number) => {
            filter = filter.toLocaleLowerCase();
            if (item.type.toLocaleLowerCase().indexOf(filter) !== -1) {
                matches++;
            } else if (item.description.toLocaleLowerCase().indexOf(filter) !== -1) {
                matches++;
            }

            // no match yet, we check labels for a match
            if (index === matches) {
                for (let label of item.labels) {
                    if (label.toLocaleLowerCase().indexOf(filter) !== -1) {
                        matches++;
                        break;
                    }
                }
            }
        });
        return matches === filters.length;
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

        if (filterStrings) {
            console.debug(`#transform(); will filter ${items.length} items based filters: [${filters}]`);
        }

        filtered = filterStrings ? items.filter(item => this.isMatching(item, filters)) : items;

        if (maxItems >= 0) {
            console.debug(`#transform(); will slice ${filtered.length} filtered items to max ${maxItems} items`);
            return filtered.slice(0, maxItems);
        } else {
            return filtered;
        }
    }

}
