import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ItemStack } from '../../../../model';

@Component({
    selector: 'jgd-reservation-items',
    templateUrl: './reservation-items.component.html',
    styleUrls: ['./reservation-items.component.scss']
})
export class ReservationItemsComponent implements OnChanges {

    @Input() stacks: ItemStack[];
    slicedStacks: ItemStack[];

    selectedLast: ItemStack;
    maxStacks = 20;

    page = 1;
    totalPages = 1;

    total: number;

    ngOnChanges(changes: SimpleChanges): void {
        this.page = 1;
        if (this.stacks) {
            this.sort();
            this.slice();
        }
    }

    onSelectedCountChanged(stack: ItemStack, count: number) {
        stack.selectedCount = count;
        stack.selected = true;
    }

    onClick(stack: ItemStack, event?: MouseEvent) {
        if (!stack.blocked) {
            stack.selected = !stack.selected;
            ;
        }

        // FIXME rethink; selectedCount missing or throw away
        // const shiftKey = event ? event.shiftKey : false;
        // let selectedStacks: ItemStack[] = [stack];
        // if (this.selectedLast !== undefined && !stack.selected && shiftKey) {
        //     selected = true;
        //     const indexOfLastSelected = this.slicedStacks.indexOf(this.selectedLast);
        //     const indexOfClickedStack = this.slicedStacks.indexOf(stack);
        //     if (indexOfLastSelected < indexOfClickedStack) {
        //         selectedStacks = this.slicedStacks
        //             .slice(indexOfLastSelected, indexOfClickedStack + 1)
        //             .filter(_stack => !_stack.blocked);
        //     } else {
        //         selectedStacks = this.slicedStacks
        //             .slice(indexOfClickedStack, indexOfLastSelected + 1)
        //             .filter(_stack => !_stack.blocked);
        //     }
        // }
        //
        // if (this.selectedLast === undefined && !stack.selected) {
        //     this.selectedLast = stack;
        // } else if (!stack.selected && !shiftKey) {
        //     this.selectedLast = stack;
        // } else if (stack.selected && !shiftKey) {
        //     this.selectedLast = undefined;
        //     selected = false;
        // }
        // selectedStacks.forEach((s: ItemStack) => {
        //     s.selected = selected;
        // });
    }

    showPage(page: number) {
        if (page <= this.totalPages) {
            this.page = page;
            this.slice();
        }
    }

    private sort() {
        this.stacks.sort((stack1: ItemStack, stack2: ItemStack) => {
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
    }

    private slice() {
        this.total = this.stacks.length;
        this.totalPages = Math.ceil(this.total / this.maxStacks);
        this.slicedStacks = this.stacks.slice((this.page - 1) * this.maxStacks, this.maxStacks * this.page);
    }

}
