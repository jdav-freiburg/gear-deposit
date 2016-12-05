import { Item, ItemStack } from './item';
import { createMockItems } from '../../testing/mocks';
import { convert } from './item-stack-factory';

describe('item-stack-factory#convert', () => {

    let itemStacks: ItemStack[];
    let items: Item[];

    beforeEach(() => {
        items = createMockItems(5);
        itemStacks = convert(items);
    });

    it('should contain the same items', () => {
        expect(itemStacks).toBeDefined();
        expect(itemStacks[0].items.size).toEqual(items.length);
        items.forEach(i => expect(itemStacks[0].items.has(i)).toBe(true));
    });

    it('should contain corresponding ItemStack', () => {
        expect(itemStacks).toBeDefined();
        expect(itemStacks.length).toEqual(1);
        expect(itemStacks[0].description).toEqual(items[0].description);
        expect(itemStacks[0].shape).toEqual(items[0].shape);
        expect(itemStacks[0].type).toEqual(items[0].type);
    });

});
