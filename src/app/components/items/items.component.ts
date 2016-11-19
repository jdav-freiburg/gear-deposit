import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Item } from '../../model/item';
import { ItemFilterPipe } from '../../pipes/item-filter.pipe';

@Component({
    selector: 'jgd-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnChanges {

    @Input() addFilter: boolean = false;
    @Input() flagged: boolean = false;
    @Input() items: Item[];

    @Output() selected: EventEmitter<Set<Item>> = new EventEmitter<Set<Item>>();
    @Output() deselected: EventEmitter<Set<Item>> = new EventEmitter<Set<Item>>();

    private filter: string;
    private filteredItems: Item[];

    constructor(private itemFilter: ItemFilterPipe) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateFilteredItems();
    }

    private filterChanged(filter: string) {
        this.filter = filter;
        this.updateFilteredItems();
    }

    private updateFilteredItems() {
        this.filteredItems = this.itemFilter.transform(this.items, this.filter, this.flagged);
    }

    private emit(selected: boolean, item?: Item) {
        let event: EventEmitter<Set<Item>> = selected ? this.selected : this.deselected;
        if (item !== undefined) {
            event.emit(new Set<Item>([item]));
        } else {
            event.emit(new Set<Item>(this.filteredItems.filter((item: Item) => {
                return item.flagged === selected;
            })));
        }
    }

    private onClick(item: Item) {
        let selected: boolean = !item.flagged;
        item.flagged = selected;
        this.emit(selected, item);
    }

    private flagAll(flagged: boolean) {
        this.filteredItems.forEach((item: Item) => {
            item.flagged = flagged;
        })
        this.emit(flagged);
    }

}
