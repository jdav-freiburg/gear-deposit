import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ItemStack } from '../../../model/item';

export enum Style {
    SIMPLE, TAG
}

@Component({
    selector: 'jgd-item-stack',
    templateUrl: './item-stack.component.html',
    styleUrls: ['./item-stack.component.scss']
})
export class ItemStackComponent {

    @Input() countStyle: Style = Style.TAG;

    @Input() itemStack: ItemStack;
    @Output() tagClicked: EventEmitter<void> = new EventEmitter<void>();

}
