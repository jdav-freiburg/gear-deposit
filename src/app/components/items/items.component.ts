import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Item, ItemStack } from '../../model/item';
import { ItemFilterPipe } from '../../pipes/item-filter.pipe';

@Component({
    selector: 'jgd-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss']
})
export class ItemsComponent {

    @Output() selected: EventEmitter<Set<Item>> = new EventEmitter<Set<Item>>();
    @Output() deselected: EventEmitter<Set<Item>> = new EventEmitter<Set<Item>>();

    private _items: Set<Item>;

    private filter: string;
    private filteredStacks: ItemStack[];

    constructor(private itemFilter: ItemFilterPipe) {
    }

    @Input()
    set items(items: Set<Item>) {
        if (items !== undefined) {
            this._items = items;
            this.updateFilteredItems();
        }
    }

    get items(): Set<Item> {
        return this._items;
    }

    private filterChanged(filter: string) {
        this.filter = filter;
        this.updateFilteredItems();
    }

    private updateFilteredItems() {
        console.debug('#updateFilteredItems();');
        let filtered: Item[] = this.itemFilter.transform(Array.from(this._items), this.filter);
        let stacks: ItemStack[] = [];
        let found: boolean;

        filtered.forEach((item: Item) => {
            found = false;
            for (let stack of stacks) {
                found = stack.add(item);
                if (found) {
                    break;
                }
            }
            if (!found) {
                stacks.push(new ItemStack(item));
            }
        });

        stacks.sort((stack1: ItemStack, stack2: ItemStack)=> {
            if ((stack1.items.length > stack2.items.length) ||
                (stack1.items.length === stack2.items.length && stack1.type < stack2.type)) {
                return -1;
            }
            if ((stack1.items.length < stack2.items.length) ||
                (stack1.items.length === stack2.items.length && stack1.type > stack2.type)) {
                return 1;
            }
            return 0;
        });

        this.filteredStacks = stacks;
    }

    private onClick(stack: ItemStack) {
        let item: Item = stack.items[0];
        let selected: boolean = !item.flagged;
        item.flagged = selected;
        (selected ? this.selected : this.deselected).emit(new Set<Item>([item]));
    }

}
