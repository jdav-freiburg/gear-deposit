import { Item, ItemStack } from './item';
import {
    createMockItem,
    MOCK_ITEM_TYPE,
    MOCK_ITEM_DESCRIPTION,
    MOCK_ITEM_SHAPE,
    MOCK_ITEM_LABELS
} from '../../testing/mocks';

describe('Class: ItemStack', () => {

    let itemStack: ItemStack;
    let item1: Item;

    beforeEach(() => {
        item1 = createMockItem(1);
        itemStack = new ItemStack(item1);
    });

    it('should have attributes set', () => {
        expect(itemStack.type).toEqual(MOCK_ITEM_TYPE);
        expect(itemStack.description).toEqual(MOCK_ITEM_DESCRIPTION);
        expect(itemStack.shape).toEqual(MOCK_ITEM_SHAPE);
        expect(itemStack.labels).toEqual(MOCK_ITEM_LABELS);
        expect(itemStack.items.length).toEqual(1);
        expect(itemStack.items[0]).toBe(item1);
    });

    it('should add item to stack and return \'true\' when it equals metadata', () => {
        let item2 = createMockItem(2);
        let added = itemStack.add(item2);
        expect(added).toBe(true);
        expect(itemStack.items.length).toEqual(2);
        expect(itemStack.items[1]).toBe(item2);
    });

    it('should not add item to stack and return \'false\' when it doesn\'t equal metadata', () => {
        let item2 = createMockItem(2);
        item2.type = `changed ${MOCK_ITEM_TYPE}`;
        let added = itemStack.add(item2);
        expect(added).toBe(false);
        expect(itemStack.items.length).toEqual(1);
        expect(itemStack.items[0]).toBe(item1);
    });

});
