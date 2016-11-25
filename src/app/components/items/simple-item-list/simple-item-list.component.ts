import { Component, Input } from '@angular/core';
import { ItemStacks } from '../../../model/item';

@Component({
    selector: 'jgd-simple-item-list',
    templateUrl: 'simple-item-list.component.html',
    styleUrls: ['simple-item-list.component.scss']
})
export class SimpleItemListComponent {

    @Input() itemStacks: ItemStacks;

}
