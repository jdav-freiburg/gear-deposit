import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../services/item.service';
import { Item } from '../../../model/item';

@Component({
    selector: 'jgd-new-reservation',
    templateUrl: './new-reservation.component.html',
    styleUrls: ['./new-reservation.component.scss']
})
export class NewReservationComponent implements OnInit {

    private reserved: Set<Item> = new Set<Item>();
    private flagged: boolean = false;

    private items: Item[];

    constructor(private itemService: ItemService) {
    }

    ngOnInit() {
        this.itemService.items.subscribe((items: Item[]) => {
            this.items = items;
        });
    }

    private addToReserved(item: Item): void {
        if (item.flagged) {
            this.removeFromReserved(item);
        } else {
            item.flagged = true;
            this.reserved.add(item);
        }
    }

    private removeFromReserved(item: Item): void {
        item.flagged = false;
        this.reserved.delete(item);
    }

    private reservedFilterOnClick(): void {
        this.flagged = !this.flagged;
    }

}
