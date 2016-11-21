import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ItemStack } from '../../model/item';

@Component({
    selector: 'jgd-item-stack',
    templateUrl: './item-stack.component.html',
    styleUrls: ['./item-stack.component.scss']
})
export class ItemStackComponent {

    @Input() itemStack: ItemStack;
    @Output() tagClicked: EventEmitter<void> = new EventEmitter<void>();

}
