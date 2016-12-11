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

    it('should block item if it belongs to stack', () => {
        let blocked = itemStack.block(item1);
        expect(blocked).toBe(true);
        expect(item1.blocked).toBe(true);
        expect(itemStack.blockedCount).toEqual(1);
    });

    it('should not block item if it doesn\'t belong to stack', () => {
        let item2 = createMockItem(2);
        item2.type = `changed ${MOCK_ITEM_TYPE}`;
        let blocked = itemStack.block(item2);
        expect(blocked).toBe(false);
        expect(item1.blocked).toBeFalsy(); // blocked is optional and only set when it was set to true once
        expect(itemStack.blockedCount).toEqual(0);
    });

    it('should block entire stack if all items are blocked', () => {
        let item2 = createMockItem(2);
        itemStack.add(item2);
        itemStack.block(item1);
        itemStack.block(item2);
        expect(itemStack.blockedCount).toEqual(2);
        expect(itemStack.availableItemCount).toEqual(0);
        expect(itemStack.blocked).toBe(true);
    });

    it('should not block entire stack if only a few items are blocked', () => {
        let item2 = createMockItem(2);
        let item3 = createMockItem(3);
        itemStack.add(item2);
        itemStack.block(item1);
        itemStack.block(item2);
        itemStack.add(item3);
        expect(itemStack.blockedCount).toEqual(2);
        expect(itemStack.availableItemCount).toEqual(1);
        expect(itemStack.blocked).toBe(false);
    });

    it('should unblock all', () => {
        let item2 = createMockItem(2);
        let item3 = createMockItem(3);
        itemStack.add(item2);
        itemStack.add(item3);
        itemStack.block(item1);
        itemStack.block(item2);
        itemStack.unblockAll();
        expect(itemStack.blockedCount).toEqual(0);
        expect(itemStack.availableItemCount).toEqual(3);
        expect(itemStack.blocked).toBe(false);
        expect(item1.blocked).toBeFalsy();
        expect(item2.blocked).toBeFalsy();
        expect(item3.blocked).toBeFalsy();
    });

});
