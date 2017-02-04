import { Item, ItemStack } from './item';

export function convert(items: Item[]): ItemStack[] {

    const stacks: ItemStack[] = [];

    function add(item: Item) {
        const stackFound = tryToAddToCorrespondingStack(item);
        if (!stackFound) {
            stacks.push(new ItemStack(item));
        }
    }

    function tryToAddToCorrespondingStack(item: Item): boolean {
        let found: boolean;
        for (const stack of stacks) {
            found = stack.add(item);
            if (found) {
                return true;
            }
        }
        return false;
    }

    items.forEach(item => add(item));

    return stacks;
}

