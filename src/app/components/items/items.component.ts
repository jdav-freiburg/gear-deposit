import { Component, Output, EventEmitter } from '@angular/core';
import { Item } from '../../model/item';

@Component({
    selector: 'jgd-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss']
})
export class ItemsComponent {

    @Input() private items: Item[];
    @Output() private selected: EventEmitter<Item> = new EventEmitter<Item>();

    private filter: string;

    constructor() {
    }

    private onClick(item: Item) {
        this.selected.emit(item);
    }

}
