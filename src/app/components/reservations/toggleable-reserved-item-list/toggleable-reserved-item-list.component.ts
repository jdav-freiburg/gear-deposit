import { Component, Input } from '@angular/core';
import { ItemStacks } from '../../../model/item';

@Component({
    selector: 'jgd-toggleable-reserved-item-list',
    templateUrl: './toggleable-reserved-item-list.component.html',
    styleUrls: ['./toggleable-reserved-item-list.component.scss']
})
export class ToggleableReservedItemListComponent {

    @Input() itemStacks: ItemStacks;

}
