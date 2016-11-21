export class ItemMetadata {
    type: string;
    description: string;
    shape: string;
    labels: string[];

    constructor(type: string, description: string, shape: string, labels: string[]) {
        this.type = type;
        this.description = description;
        this.shape = shape;
        this.labels = labels;
    }
}

export class Item extends ItemMetadata {
    id: string;
    flagged: boolean;

    constructor(id: string, type: string, description: string, shape: string, labels: string[], flagged?: boolean) {
        super(type, description, shape, labels);
        this.id = id;
        this.flagged = flagged;
    }

    isOk(): boolean {
        return this.shape.trim().toLocaleLowerCase() === 'ok';
    }
}

export class ItemStack extends ItemMetadata {
    items: Item[];

    constructor(item: Item) {
        super(item.type, item.description, item.shape, item.labels);
        this.items = [item];
    }

    add(item: Item): boolean {
        if (this.canJoin(item)) {
            this.items.push(item);
            return true;
        }
        return false;
    }

    private canJoin(item: Item): boolean {
        return this.type === item.type &&
            this.description === item.description &&
            this.shape === item.shape;
        //FIXME labels missing...
    }

}
