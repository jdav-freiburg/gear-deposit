import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Item, ItemStack, ItemStacks } from '../../model/item';
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

    private selectedLast: ItemStack;

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
        let itemStacks: ItemStacks = new ItemStacks();
        let filtered: Item[] = this.itemFilter.transform(Array.from(this._items), this.filter);

        filtered.forEach((item: Item) => {
            itemStacks.add(item);
        });

        itemStacks.list.sort((stack1: ItemStack, stack2: ItemStack)=> {
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

        this.filteredStacks = itemStacks.list;
    }

    private stackSelectedChanged(stack: ItemStack, count: number) {
        stack.selected = count;
        if (stack.flagged) {
            this.emitSelectedChange([stack], true);
        }
    }

    private onClick(stack: ItemStack, event: MouseEvent) {
        let selected = !stack.flagged;
        let selectedStacks: ItemStack[] = [stack];

        if (this.selectedLast !== undefined && !stack.flagged && event.shiftKey) {
            selected = true;
            let indexOfLastSelected = this.filteredStacks.indexOf(this.selectedLast);
            let indexOfClickedStack = this.filteredStacks.indexOf(stack);
            if (indexOfLastSelected < indexOfClickedStack) {
                selectedStacks = this.filteredStacks.slice(indexOfLastSelected, indexOfClickedStack + 1);
            } else {
                selectedStacks = this.filteredStacks.slice(indexOfClickedStack, indexOfLastSelected + 1);
            }
        }

        if (this.selectedLast === undefined && !stack.flagged) {
            this.selectedLast = stack;
        } else if (!stack.flagged && !event.shiftKey) {
            this.selectedLast = stack;
        } else if (stack.flagged && !event.shiftKey) {
            this.selectedLast = undefined;
            selected = false;
        }

        this.emitSelectedChange(selectedStacks, selected);
    }

    private emitSelectedChange(stacks: ItemStack[], selected: boolean) {
        let items: Item[] = [];

        stacks.forEach((stack: ItemStack) => {
            let count = stack.selected > 1 ? stack.selected : 1;
            items = items.concat(Array.from(stack.items).slice(0, count));
            stack.flagged = selected;
        });

        console.debug(`will emit ${selected ? 'selected' : 'deselected'} change`, items);
        (selected ? this.selected : this.deselected).emit(new Set<Item>(items));
    }

}
