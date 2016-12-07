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
        expect(itemStack.items.size).toEqual(1);
        expect(itemStack.items.has(item1)).toBe(true);
    });

    it('should add item to stack and return \'true\' when it equals metadata', () => {
        let item2 = createMockItem(2);
        let added = itemStack.add(item2);
        expect(added).toBe(true);
        expect(itemStack.items.size).toEqual(2);
        expect(itemStack.items.has(item2)).toBe(true);
    });

    it('should not add item to stack and return \'false\' when it doesn\'t equal metadata', () => {
        let item2 = createMockItem(2);
        item2.type = `changed ${MOCK_ITEM_TYPE}`;
        let added = itemStack.add(item2);
        expect(added).toBe(false);
        expect(itemStack.items.size).toEqual(1);
        expect(itemStack.items.has(item1)).toBe(true);
    });

    it('should not add item to stack and return \'false\' when its type doesn\'t match', () => {
        let item2 = createMockItem(2);
        item2.type = `changed ${MOCK_ITEM_TYPE}`;
        let added = itemStack.add(item2);
        expect(added).toBe(false);
        expect(itemStack.items.size).toEqual(1);
        expect(itemStack.items.has(item1)).toBe(true);
    });

    it('should not add item to stack and return \'false\' when its description doesn\'t match', () => {
        let item2 = createMockItem(2);
        item2.description = `changed ${MOCK_ITEM_DESCRIPTION}`;
        let added = itemStack.add(item2);
        expect(added).toBe(false);
        expect(itemStack.items.size).toEqual(1);
        expect(itemStack.items.has(item1)).toBe(true);
    });

    it('should not add item to stack and return \'false\' when its shape doesn\'t match', () => {
        let item2 = createMockItem(2);
        item2.shape = `changed ${MOCK_ITEM_SHAPE}`;
        let added = itemStack.add(item2);
        expect(added).toBe(false);
        expect(itemStack.items.size).toEqual(1);
        expect(itemStack.items.has(item1)).toBe(true);
    });

});
