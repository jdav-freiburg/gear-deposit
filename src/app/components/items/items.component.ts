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

        // FIXME refactor...
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
            // FIXME remove not needed code, decide which ordering...
            // stack count + type ordering
            // if ((stack1.items.length > stack2.items.length) ||
            //     (stack1.items.length === stack2.items.length && stack1.type < stack2.type)) {
            //     return -1;
            // }
            // if ((stack1.items.length < stack2.items.length) ||
            //     (stack1.items.length === stack2.items.length && stack1.type > stack2.type)) {
            //     return 1;
            // }

            // type + description ordering
            if ((stack1.type < stack2.type) ||
                (stack1.type === stack2.type && stack1.description < stack2.description)) {
                return -1;
            }
            if ((stack1.type > stack2.type) ||
                (stack1.type === stack2.type && stack1.description > stack2.description)) {
                return 1;
            }

            return 0;
        });

        this.filteredStacks = stacks;
    }

    private stackSelectedChanged(stack: ItemStack, count: number) {
        stack.selected = count;
        if (stack.items[0].flagged) {
            this.emitSelectedChange(stack, true);
        }
    }

    private onClick(stack: ItemStack) {
        this.emitSelectedChange(stack);
    }

    private emitSelectedChange(stack: ItemStack, ignoreFlagged?: boolean) {
        let count = stack.selected > 1 ? stack.selected : 1;
        let items: Item[] = stack.items.slice(0, count);

        // when selected change was only triggered by increasing the item count, we must not deselect the stack before
        // we emit the event... deselect or changing the selected state must only be triggered by click on the stack...
        let selected: boolean = ignoreFlagged ? true : !items[0].flagged;
        items[0].flagged = selected;

        console.debug(`will emit ${selected ? 'selected' : 'deselected'} change`, items);
        (selected ? this.selected : this.deselected).emit(new Set<Item>(items));
    }

}
