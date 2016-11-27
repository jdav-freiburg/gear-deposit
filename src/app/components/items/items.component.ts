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

    private blocked: Set<Item> = new Set<Item>();
    private _items: Set<Item>;

    filter: string;
    filteredStacks: ItemStack[];

    selectedLast: ItemStack;

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

    public block(itemSet: Set<Item>) {
        console.debug('#block();', itemSet);
        let items: Item[];
        this.filteredStacks.forEach((stack: ItemStack) => {
            items = Array.from(itemSet);
            items.forEach((i: Item) => {
                if (stack.canJoin(i)) {
                    itemSet.delete(i);
                    i.blocked = true;
                    stack.blockedCount++;
                    this.blocked.add(i);
                }
            });
        });
    }

    public unblockAll() {
        console.debug('#unblockAll();');
        this.blocked.clear();
        this.filteredStacks.forEach((stack: ItemStack) => {
            let items: Item[] = Array.from(stack.items);
            let index = 0;
            while (stack.blockedCount > 0) {
                if (items[index].blocked) {
                    items[index].blocked = false;
                    stack.blockedCount--;
                }
                index++;
            }
        });
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

        itemStacks.list.sort((stack1: ItemStack, stack2: ItemStack) => {
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
        this.block(this.blocked);
    }

    private stackSelectedChanged(stack: ItemStack, count: number) {
        stack.selectedCount = count;
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
                selectedStacks = this.filteredStacks
                    .slice(indexOfLastSelected, indexOfClickedStack + 1)
                    .filter(stack => !stack.blocked);
            } else {
                selectedStacks = this.filteredStacks
                    .slice(indexOfClickedStack, indexOfLastSelected + 1)
                    .filter(stack => !stack.blocked);
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
            let count = stack.selectedCount > 1 ? stack.selectedCount : 1;
            items = items.concat(Array.from(stack.items).slice(0, count));
            stack.flagged = selected;
        });

        console.debug(`will emit ${selected ? 'selected' : 'deselected'} change`, items);
        (selected ? this.selected : this.deselected).emit(new Set<Item>(items));
    }

}
