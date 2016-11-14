import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Item } from '../../model/item';

@Component({
    selector: 'jgd-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss']
})
export class ItemsComponent {

    @Input() private addFilter: boolean = false;
    @Input() private flagged: boolean = false;
    @Input() private items: Item[];
    @Output() private selected: EventEmitter<Item> = new EventEmitter<Item>();

    private filter: string;

    private onClick(item: Item) {
        this.selected.emit(item);
    }

}
