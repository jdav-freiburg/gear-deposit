export class ItemMetadata {

    constructor(public type: string, public description: string, public shape: string, public labels: string[],
                public selected?: boolean) {
    }

    isOk(): boolean {
        return this.shape.trim().toLocaleLowerCase() === 'ok';
    }
}

export class Item extends ItemMetadata {

    blocked?: boolean;

    constructor(public id: string, type: string, description: string, shape: string, labels: string[],
                selected?: boolean) {
        super(type, description, shape, labels, selected);
    }

}

export class ItemStack extends ItemMetadata {

    private _blockedCount = 0;

    items: Set<Item> = new Set<Item>();
    selectedCount?: number;

    constructor(item: Item) {
        super(item.type, item.description, item.shape, item.labels, item.selected);
        this.items.add(item);
    }

    add(item: Item): boolean {
        if (this.canJoin(item)) {
            this.items.add(item);
            return true;
        }
        return false;
    }

    private canJoin(item: Item): boolean {
        return this.type === item.type &&
            this.description === item.description &&
            this.shape === item.shape;
        // FIXME labels missing...
    }

    block(itemId: string): boolean {
        let belongsToStack = false;
        const filtered: Item[] = Array.from(this.items).filter(item => {
            return item.id === itemId;
        });
        if (filtered.length > 0) {
            belongsToStack = true;
            if (!filtered[0].blocked) {
                filtered[0].blocked = true;
                this._blockedCount++;
                this.selected = false;
            }
        }
        return belongsToStack;
    }

    unblockAll(): void {
        const items: Item[] = Array.from(this.items);
        let index = 0;
        while (this._blockedCount > 0 && index < items.length) {
            if (items[index].blocked) {
                items[index].blocked = false;
                this._blockedCount--;
            }
            index++;
        }
        this._blockedCount = 0;
    }

    get blockedCount(): number {
        return this._blockedCount;
    }

    get blocked(): boolean {
        return this._blockedCount === this.items.size;
    }

    get availableItemCount(): number {
        return this.items.size - this._blockedCount;
    }

}
