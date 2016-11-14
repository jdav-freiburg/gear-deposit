import { Component, Input } from '@angular/core';
import { Item } from '../../model/item';

@Component({
    selector: 'jgd-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent {

    @Input() private item: Item;

}
