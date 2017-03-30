import { Component, Input } from '@angular/core';
import { convert, Item, ItemStack } from '../../../model';

@Component({
    selector: 'jgd-simple-item-list',
    templateUrl: './simple-item-list.component.html',
    styleUrls: ['./simple-item-list.component.scss']
})
export class SimpleItemListComponent {

    stacks: ItemStack[] = [];

    @Input()
    set items(items: Item[]) {
        this.stacks = convert(items);
    }

}
