import { Component, OnInit } from '@angular/core';
import { Item } from '../../model';
import { ItemService, UiMessageService } from '../../services';

@Component({
    selector: 'jgd-admin-edit-items',
    styleUrls: ['./admin-edit-items.component.scss'],
    templateUrl: './admin-edit-items.component.html'
})
export class EditItemsComponent implements OnInit {

    items: Item[];
    changed = 0;
    filter: string;

    private changedItems: Map<string, Item> = new Map<string, Item>();

    constructor(private itemService: ItemService,
                private uiMessage: UiMessageService) {
    }

    ngOnInit(): void {
        this.itemService.items$().subscribe((items: Item[]) => {
            this.items = items.sort((item1: Item, item2: Item) => {
                // type + description ordering
                if ((item1.type < item2.type) ||
                    (item1.type === item2.type && item1.description < item2.description)) {
                    return -1;
                }
                if ((item1.type > item2.type) ||
                    (item1.type === item2.type && item1.description > item2.description)) {
                    return 1;
                }

                return 0;
            });
        });
    }

    private areEqual(item1: Item, item2: Item) {
        return item1.type === item2.type && item1.description === item2.description && item1.shape === item2.shape;
    }

    onItemTypeChanged(item: Item, value: string): void {
        const alreadyChanged: Item = this.changedItems.get(item.id);
        item.selected = true;
        if (alreadyChanged !== undefined) {
            alreadyChanged.type = value;
            if (this.areEqual(item, alreadyChanged)) {
                this.changedItems.delete(item.id);
                item.selected = false;
            }
        } else {
            this.changedItems.set(item.id, new Item(
                item.id,
                value,
                item.description,
                item.shape,
                item.labels
            ));
        }
        this.changed = this.changedItems.size;
    }

    onItemDescriptionChanged(item: Item, value: string) {
        const alreadyChanged: Item = this.changedItems.get(item.id);
        item.selected = true;
        if (alreadyChanged !== undefined) {
            alreadyChanged.description = value;
            if (this.areEqual(item, alreadyChanged)) {
                this.changedItems.delete(item.id);
                item.selected = false;
            }
        } else {
            this.changedItems.set(item.id, new Item(
                item.id,
                item.type,
                value,
                item.shape,
                item.labels
            ));
        }
        this.changed = this.changedItems.size;
    }

    onItemShapeChanged(item: Item, value: string) {
        const alreadyChanged: Item = this.changedItems.get(item.id);
        item.selected = true;
        if (alreadyChanged !== undefined) {
            alreadyChanged.shape = value;
            if (this.areEqual(item, alreadyChanged)) {
                this.changedItems.delete(item.id);
                item.selected = false;
            }
        } else {
            this.changedItems.set(item.id, new Item(
                item.id,
                item.type,
                item.description,
                value,
                item.labels
            ));
        }
        this.changed = this.changedItems.size;
    }

    saveChanged() {
        console.time('#saveChanged');
        const changedCount = this.changedItems.size;
        let responseCount = 0;
        this.changedItems.forEach((item: Item, id: string, map: Map<string, Item>) => {
            this.itemService.update(id, item)
                .then(() => {
                    responseCount++;
                    if (responseCount === changedCount) {
                        console.info('#saveChanged(); done');
                        console.timeEnd('#saveChanged');
                    }
                })
                .catch((err: any) => {
                    console.error('#saveChanged(); got error while saving', err);
                    this.uiMessage.emitError(`Unbekannter Fehler - '${item.type}' nicht gespeichert`);
                    responseCount++;
                });
        });
        this.showSavedMessage();
        this.changedItems.clear();
        this.changed = 0;

    }

    private showSavedMessage() {
        this.uiMessage.emitInfo('Änderungen gespeichert');
    }

}
