import { Component, Input } from '@angular/core';
import { convert, ItemStack, Item } from '../../../model';

@Component({
    selector: 'jgd-simple-item-list',
    templateUrl: './simple-item-list.component.html',
    styleUrls: ['./simple-item-list.component.scss']
})
export class SimpleItemListComponent {

    private stacks: ItemStack[] = [];

    @Input()
    set items(items: Item[]) {
        this.stacks = convert(items);
    }

}
