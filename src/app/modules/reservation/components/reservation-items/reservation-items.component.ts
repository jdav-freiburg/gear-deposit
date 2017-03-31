import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ItemStack } from '../../../../model';
import { ReservationStateService } from '../../services/reservation-state.service';

@Component({
    selector: 'jgd-reservation-items',
    templateUrl: './reservation-items.component.html',
    styleUrls: ['./reservation-items.component.scss']
})
export class ReservationItemsComponent implements OnInit {

    @Output() selected: EventEmitter<ItemStack[]> = new EventEmitter<ItemStack[]>();
    @Output() deselected: EventEmitter<ItemStack[]> = new EventEmitter<ItemStack[]>();

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

    onFilterChanged(filter: string) {
        console.debug('#onFilterChanged(); > ', filter);
        this.all = this.reservationState.filter(filter);
        this.page = 1;
        this.sort();
        this.slice();
    }

    stackSelectedChanged(stack: ItemStack, count: number) {
        stack.selectedCount = count;
        if (stack.flagged) {
            this.emitSelectedChange([stack], true);
        }
    }

    // FIXME selectedCount missing
    onClick(stack: ItemStack, event?: MouseEvent) {
        let shiftKey = event ? event.shiftKey : false;
        let selected = !stack.flagged;
        let selectedStacks: ItemStack[] = [stack];

        if (stack.blocked) {
            return;
        }

        if (this.selectedLast !== undefined && !stack.flagged && shiftKey) {
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

        if (this.selectedLast === undefined && !stack.flagged) {
            this.selectedLast = stack;
        } else if (!stack.flagged && !shiftKey) {
            this.selectedLast = stack;
        } else if (stack.flagged && !shiftKey) {
            this.selectedLast = undefined;
            selected = false;
        }

        this.emitSelectedChange(selectedStacks, selected);
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

    private emitSelectedChange(stacks: ItemStack[], selected: boolean) {
        stacks.forEach((stack: ItemStack) => {
            stack.flagged = selected;
        });

        console.debug(`will emit ${selected ? 'selected' : 'deselected'} change`, stacks);
        (selected ? this.selected : this.deselected).emit(stacks);
    }

}
