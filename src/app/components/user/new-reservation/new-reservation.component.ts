import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../services/item.service';
import { Item } from '../../../model/item';

@Component({
    selector: 'jgd-new-reservation',
    templateUrl: './new-reservation.component.html',
    styleUrls: ['./new-reservation.component.scss']
})
export class NewReservationComponent implements OnInit {

    private items: Item[];

    constructor(private itemService: ItemService) {
    }

    ngOnInit() {
        this.itemService.items.subscribe((items: Item[]) => {
            this.items = items;
        });
    }

}
