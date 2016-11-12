import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../services/item.service';
import { Item } from '../../../model/item';

@Component({
    selector: 'jgd-new-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.scss']
})
export class NewReservationComponent implements OnInit {

    private items: Item[];
    private reserved: Item[];

    constructor(private itemService: ItemService) {
    }

    ngOnInit() {
        this.itemService.items.subscribe((items: Item[]) => {
            this.items = items;
        });
    }

    private onSelected(item: Item) {
        reserved.add(item);
    }

}
