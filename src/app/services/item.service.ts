import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';
import { Item } from '../model/item';

@Injectable()
export class ItemService {

    constructor(private af: AngularFire) {
    }

    public items$(): Observable<Item[]> {
        return this.af.database.list('/items').map((items: any[]) => {
            let result: Item[] = [];
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

    public types$(): Observable<string[]> {
        return this.af.database.list('/types');
    }

    public update(id: string, item: Item): firebase.Promise<void> {
        console.debug(`#update(); will update ${id} with:`, item);
        return this.af.database.object(`/items/${id}`).update({
            type: item.type,
            description: item.description,
            shape: item.shape
        });
    }

}
