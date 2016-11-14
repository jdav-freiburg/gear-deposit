import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../../services/item.service';
import { Item } from '../../../../model/item';
import { UiMessageService } from '../../../../services/ui-message.service';

@Component({
    selector: 'jgd-edit-items',
    styleUrls: ['./edit-items.component.scss'],
    templateUrl: './edit-items.component.html'
})
export class EditItemsComponent implements OnInit {

    private items: Item[];

    private filter: string;

    private changedItems: Map<string, Item> = new Map<string, Item>();
    private changed: number = 0;

    constructor(private itemService: ItemService, private uiMessageService: UiMessageService) {
    }

    ngOnInit(): void {
        this.itemService.items.subscribe((items: Item[]) => {
            this.items = items;
        });
    }

    private areEqual(item1: Item, item2: Item) {
        return item1.type === item2.type && item1.description === item2.description && item1.shape === item2.shape;
    }

    private onItemTypeChanged(item: Item, value: string): void {
        let alreadyChanged: Item = this.changedItems.get(item.id);
        item.flagged = true;
        if (alreadyChanged !== undefined) {
            alreadyChanged.type = value;
            if (this.areEqual(item, alreadyChanged)) {
                this.changedItems.delete(item.id);
                item.flagged = false;
            }
        } else {
            this.changedItems.set(item.id, <Item>{
                type: value,
                description: item.description,
                shape: item.shape,
                labels: item.labels
            });
        }
        this.changed = this.changedItems.size;
    }

    private onItemDescriptionChanged(item: Item, value: string) {
        let alreadyChanged: Item = this.changedItems.get(item.id);
        item.flagged = true;
        if (alreadyChanged !== undefined) {
            alreadyChanged.description = value;
            if (this.areEqual(item, alreadyChanged)) {
                this.changedItems.delete(item.id);
                item.flagged = false;
            }
        } else {
            this.changedItems.set(item.id, <Item>{
                type: item.type,
                description: value,
                shape: item.shape,
                labels: item.labels
            });
        }
        this.changed = this.changedItems.size;
    }

    private onItemShapeChanged(item: Item, value: string) {
        let alreadyChanged: Item = this.changedItems.get(item.id);
        item.flagged = true;
        if (alreadyChanged !== undefined) {
            alreadyChanged.shape = value;
            if (this.areEqual(item, alreadyChanged)) {
                this.changedItems.delete(item.id);
                item.flagged = false;
            }
        } else {
            this.changedItems.set(item.id, <Item>{
                type: item.type,
                description: item.description,
                shape: value,
                labels: item.labels
            });
        }
        this.changed = this.changedItems.size;
    }

    private saveChanged() {
        console.trace('#saveChanged()');
        this.changedItems.forEach((item: Item, id: string, map: Map<string, Item>) => {
            this.itemService.update(id, item);
        });
        this.showSavedMessage();
        this.changedItems.clear();
        this.changed = 0;
    }

    private showSavedMessage() {
        this.uiMessageService.emitInfo('Änderungen gespeichert');
    }

}
