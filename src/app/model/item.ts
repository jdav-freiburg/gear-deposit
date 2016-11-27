export class ItemMetadata {

    constructor(public type: string, public description: string, public shape: string, public labels: string[],
                public flagged?: boolean) {
    }

    isOk(): boolean {
        return this.shape.trim().toLocaleLowerCase() === 'ok';
    }
}

export class Item extends ItemMetadata {

    blocked?: boolean;

    constructor(public id: string, type: string, description: string, shape: string, labels: string[],
                flagged?: boolean) {
        super(type, description, shape, labels, flagged);
    }

}

export class ItemStack extends ItemMetadata {

    blockedCount: number = 0;

    items: Set<Item> = new Set<Item>();
    selectedCount?: number;

    constructor(item: Item) {
        super(item.type, item.description, item.shape, item.labels, item.flagged);
        this.items.add(item);
    }

    add(item: Item): boolean {
        if (this.canJoin(item)) {
            this.items.add(item);
            return true;
        }
        return false;
    }

    canJoin(item: Item): boolean {
        return this.type === item.type &&
            this.description === item.description &&
            this.shape === item.shape;
        //FIXME labels missing...
    }

    get blocked(): boolean {
        return this.blockedCount === this.items.size;
    }

    get availableItemCount(): number {
        return this.items.size - this.blockedCount;
    }

}

export class ItemStacks {

    list: ItemStack[] = [];
    items: Set<Item> = new Set();

    public add(item: Item) {
        if (!this.items.has(item)) {
            let stackFound = this.tryToAddToCorrespondingStack(item);
            if (!stackFound) {
                this.list.push(new ItemStack(item));
            }
            this.items.add(item);
        }
    }

    private tryToAddToCorrespondingStack(item: Item): boolean {
        let found = false;
        for (let stack of this.list) {
            found = stack.add(item);
            if (found) {
                return true;
            }
        }
        return false;
    }

}
