import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ItemStack } from '../../../model';
import { ReservationStateService } from '../../reservations';

@Component({
    selector: 'jgd-editable-item-list',
    templateUrl: './editable-item-list.component.html',
    styleUrls: ['./editable-item-list.component.scss']
})
export class EditableItemListComponent {

    @Output() stackRemoved: EventEmitter<ItemStack> = new EventEmitter<ItemStack>();

    @Input() filtered: ItemStack[];

    constructor(private reservationState: ReservationStateService) {
    }

    stackSelectedChanged(stack: ItemStack, count: number) {
        stack.selectedCount = count;
        if (stack.flagged) {
            this.emitSelectedChange([stack], true);
        }
    }

}
