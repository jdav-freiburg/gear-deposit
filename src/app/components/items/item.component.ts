import { Component } from '@angular/core';

@Component({
    selector: 'jgd-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent {

    @Input() private item: Item;

}
