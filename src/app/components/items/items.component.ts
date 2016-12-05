import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ItemStack } from '../../model/item';
import { ReservationStateService } from '../reservations/reservation-state.service';

@Component({
    selector: 'jgd-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

    @Output() selected: EventEmitter<ItemStack[]> = new EventEmitter<ItemStack[]>();
    @Output() deselected: EventEmitter<ItemStack[]> = new EventEmitter<ItemStack[]>();

    filtered: ItemStack[];
    selectedLast: ItemStack;

    constructor(private reservationState: ReservationStateService) {
    }

    ngOnInit(): void {
        this.reservationState.initialized.subscribe(() => {
            this.filtered = this.reservationState.stacks;
            this.sort();
        });
    }

    private onFilterChanged(filter: string) {
        console.debug('#onFilterChanged(); > ', filter);
        this.filtered = this.reservationState.filter(filter);
        this.sort();
    }

    private sort() {
        this.filtered.sort((stack1: ItemStack, stack2: ItemStack) => {
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

    private stackSelectedChanged(stack: ItemStack, count: number) {
        stack.selectedCount = count;
        if (stack.flagged) {
            this.emitSelectedChange([stack], true);
        }
    }

    // FIXME selectedCount missing
    private onClick(stack: ItemStack, event: MouseEvent) {
        let selected = !stack.flagged;
        let selectedStacks: ItemStack[] = [stack];

        if (this.selectedLast !== undefined && !stack.flagged && event.shiftKey) {
            selected = true;
            let indexOfLastSelected = this.filtered.indexOf(this.selectedLast);
            let indexOfClickedStack = this.filtered.indexOf(stack);
            if (indexOfLastSelected < indexOfClickedStack) {
                selectedStacks = this.filtered
                    .slice(indexOfLastSelected, indexOfClickedStack + 1)
                    .filter(stack => !stack.blocked);
            } else {
                selectedStacks = this.filtered
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
        stacks.forEach((stack: ItemStack) => {
            stack.flagged = selected;
        });

        console.debug(`will emit ${selected ? 'selected' : 'deselected'} change`, stacks);
        (selected ? this.selected : this.deselected).emit(stacks);
    }

}
