import { Component, EventEmitter, Input, Output } from '@angular/core';
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

    @Input() itemStack: ItemStack;
    @Input() countStyle: Style = Style.TAG;

    @Output() tagClicked: EventEmitter<void> = new EventEmitter<void>();

}
