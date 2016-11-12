import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../model/item';

@Pipe({
    name: 'itemFilter'
})
export class ItemFilterPipe implements PipeTransform {

    private contains(target: string, text: string): boolean {
        return target.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) !== -1;
    }

    transform(items: Item[], type: string, description: string): any {
        if ((type === undefined || type.trim().length === 0) &&
            (description === undefined || description.trim().length === 0)) {
            return items;
        }

        let filterType = type !== undefined && type.trim().length > 0;
        let filterDescription = description !== undefined && description.trim().length > 0;
        return items.filter((item: Item) => {
            return (!filterType || (filterType && this.contains(item.type, type))) &&
                (!filterDescription || (
                    (filterDescription && this.contains(item.type, description)) ||
                    (filterDescription && this.contains(item.description, description))
                ));
        });
    }

}
