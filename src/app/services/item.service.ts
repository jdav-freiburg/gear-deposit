import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Rx';
import { Item } from '../model';

@Injectable()
export class ItemService {

    constructor(private af: AngularFire) {
    }

    items$(): Observable<Item[]> {
        return this.af.database.list('/items').map((items: any[]) => {
            const result: Item[] = [];
            items.forEach((item: any) => {
                result.push(new Item(
                    item.$key,
                    item.type,
                    item.description,
                    item.shape,
                    item.labels
                ));
            });
            return result;
        });
    }

    types$(): Observable<string[]> {
        return this.af.database.list('/types');
    }

    update(id: string, item: Item): firebase.Promise<void> {
        console.debug(`#update(); will update ${id} with:`, item);
        return this.af.database.object(`/items/${id}`).update({
            type: item.type,
            description: item.description,
            shape: item.shape
        });
    }

}
