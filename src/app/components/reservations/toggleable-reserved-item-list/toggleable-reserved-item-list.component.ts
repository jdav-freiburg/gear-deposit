import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Item } from '../../../model/item';

@Component({
    selector: 'jgd-toggleable-reserved-item-list',
    templateUrl: './toggleable-reserved-item-list.component.html',
    styleUrls: ['./toggleable-reserved-item-list.component.scss']
})
export class ToggleableReservedItemListComponent {

    @Input() reservedItems: Set<Item>;
    @Output('toggled') toggledEvent: EventEmitter<boolean> = new EventEmitter();

    private toggled = false;

    private toggleState(): void {
        this.toggled = !this.toggled;
        this.toggledEvent.emit(this.toggled);
    }

}
