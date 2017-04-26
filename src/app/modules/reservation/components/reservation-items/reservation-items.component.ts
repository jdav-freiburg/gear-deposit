import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ItemStack } from '../../../../model';
import { ReservationStateService } from '../../services/reservation-state.service';

@Component({
    selector: 'jgd-reservation-items',
    templateUrl: './reservation-items.component.html',
    styleUrls: ['./reservation-items.component.scss']
})
export class ReservationItemsComponent implements OnInit, OnChanges {

    @Input() query: string;

    all: ItemStack[];
    filtered: ItemStack[];
    selectedLast: ItemStack;
    maxStacks = 20;

    total: number;
    page: number;
    totalPages: number;

    constructor(private reservationState: ReservationStateService) {
    }

    ngOnInit(): void {
        this.reservationState.initialized.subscribe(() => {
            this.all = this.reservationState.stacks;
            this.page = 1;
            this.sort();
            this.slice();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.query !== undefined) {
            console.debug('#onFilterChanged(); > ', this.query);
            this.all = this.reservationState.filter(this.query);
            this.page = 1;
            this.sort();
            this.slice();
        }
    }

    onSelectedCountChanged(stack: ItemStack, count: number) {
        stack.selectedCount = count;
        stack.selected = true;
    }

    // FIXME selectedCount missing
    onClick(stack: ItemStack, event?: MouseEvent) {
        let shiftKey = event ? event.shiftKey : false;
        let selected = !stack.selected;
        let selectedStacks: ItemStack[] = [stack];

        if (stack.blocked) {
            return;
        }

        if (this.selectedLast !== undefined && !stack.selected && shiftKey) {
            selected = true;
            const indexOfLastSelected = this.filtered.indexOf(this.selectedLast);
            const indexOfClickedStack = this.filtered.indexOf(stack);
            if (indexOfLastSelected < indexOfClickedStack) {
                selectedStacks = this.filtered
                    .slice(indexOfLastSelected, indexOfClickedStack + 1)
                    .filter(_stack => !_stack.blocked);
            } else {
                selectedStacks = this.filtered
                    .slice(indexOfClickedStack, indexOfLastSelected + 1)
                    .filter(_stack => !_stack.blocked);
            }
        }

        if (this.selectedLast === undefined && !stack.selected) {
            this.selectedLast = stack;
        } else if (!stack.selected && !shiftKey) {
            this.selectedLast = stack;
        } else if (stack.selected && !shiftKey) {
            this.selectedLast = undefined;
            selected = false;
        }

        selectedStacks.forEach((stack: ItemStack) => {
            stack.selected = selected;
        });
    }

    showPage(page: number) {
        if (page <= this.totalPages) {
            this.page = page;
            this.slice();
        }
    }

    private sort() {
        this.all.sort((stack1: ItemStack, stack2: ItemStack) => {
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
        this.total = this.all.length;
        this.totalPages = Math.ceil(this.total / this.maxStacks);
        this.filtered = this.all.slice((this.page - 1) * this.maxStacks, this.maxStacks * this.page);
    }

}
