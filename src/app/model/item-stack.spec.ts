import { Mocks } from '../../testing';
import { Item, ItemStack } from './item';

describe('Class: ItemStack', () => {

    let itemStack: ItemStack;
    let item1: Item;

    beforeEach(() => {
        item1 = Mocks.createMockItem(1);
        itemStack = new ItemStack(item1);
    });

    it('should have attributes set', () => {
        expect(itemStack.type).toEqual(Mocks.MOCK_ITEM_TYPE);
        expect(itemStack.description).toEqual(Mocks.MOCK_ITEM_DESCRIPTION);
        expect(itemStack.shape).toEqual(Mocks.MOCK_ITEM_SHAPE);
        expect(itemStack.labels).toEqual(Mocks.MOCK_ITEM_LABELS);
        expect(itemStack.items.size).toEqual(1);
        expect(itemStack.items.has(item1)).toBe(true);
    });

    it('should add item to stack and return \'true\' when it equals metadata', () => {
        const item2 = Mocks.createMockItem(2);
        expect(itemStack.add(item2)).toBe(true);
        expect(itemStack.items.size).toEqual(2);
        expect(itemStack.items.has(item2)).toBe(true);
    });

    describe('items that don\'t belong to the stack', () => {
        let item2: Item;

        beforeEach(() => {
            item2 = Mocks.createMockItem(2);
        });

        it('should not add item to stack and return \'false\' when it doesn\'t equal metadata', () => {
            item2.type = `changed ${Mocks.MOCK_ITEM_TYPE}`;
            expect(itemStack.add(item2)).toBe(false);
        });

        it('should not add item to stack and return \'false\' when its type doesn\'t match', () => {
            item2.type = `changed ${Mocks.MOCK_ITEM_TYPE}`;
            expect(itemStack.add(item2)).toBe(false);
        });

        it('should not add item to stack and return \'false\' when its description doesn\'t match', () => {
            item2.description = `changed ${Mocks.MOCK_ITEM_DESCRIPTION}`;
            expect(itemStack.add(item2)).toBe(false);
        });

        it('should not add item to stack and return \'false\' when its shape doesn\'t match', () => {
            item2.shape = `changed ${Mocks.MOCK_ITEM_SHAPE}`;
            expect(itemStack.add(item2)).toBe(false);
        });

        afterEach(() => {
            expect(itemStack.items.size).toEqual(1);
            expect(itemStack.items.has(item1)).toBe(true);
        });
    });

    describe('(blocked)', () => {
        let item2: Item;
        let item3: Item;

        beforeEach(() => {
            item2 = Mocks.createMockItem(2);
            item3 = Mocks.createMockItem(3);
        });

        it('should block item if it belongs to stack', () => {
            const blocked = itemStack.block(item1.id);
            expect(blocked).toBe(true);
            expect(item1.blocked).toBe(true);
            expect(itemStack.blockedCount).toEqual(1);
        });

        it('should not block item if it doesn\'t belong to stack', () => {
            item2.type = `changed ${Mocks.MOCK_ITEM_TYPE}`;
            const blocked = itemStack.block(item2.id);
            expect(blocked).toBe(false);
            expect(item1.blocked).toBeFalsy(); // blocked is optional and only set when it was set to true once
            expect(itemStack.blockedCount).toEqual(0);
        });

        it('should block entire stack if all items are blocked', () => {
            itemStack.add(item2);
            itemStack.block(item1.id);
            itemStack.block(item2.id);
            expect(itemStack.blockedCount).toEqual(2);
            expect(itemStack.availableItemCount).toEqual(0);
            expect(itemStack.blocked).toBe(true);
        });

        it('should not block entire stack if only a few items are blocked', () => {
            itemStack.add(item2);
            itemStack.block(item1.id);
            itemStack.block(item2.id);
            itemStack.add(item3);
            expect(itemStack.blockedCount).toEqual(2);
            expect(itemStack.availableItemCount).toEqual(1);
            expect(itemStack.blocked).toBe(false);
        });

        it('shouldn\'t block the same item more than once', () => {
            itemStack.add(item2);
            expect(itemStack.block(item1.id)).toBe(true);
            expect(itemStack.block(item1.id)).toBe(true);
            expect(itemStack.block(item1.id)).toBe(true);
            expect(item1.blocked).toBe(true);
            expect(itemStack.blockedCount).toEqual(1);
            expect(itemStack.availableItemCount).toEqual(1);
            expect(itemStack.blocked).toBe(false);
        });

        describe('(selected)', () => {
            beforeEach(() => {
                itemStack.add(item1);
                itemStack.add(item2);
                itemStack.add(item3);
                itemStack.selected = true;
                itemStack.selectedCount = 3;
            });

            it('should deselect selected stack when stack gets blocked fully', () => {
                itemStack.items.forEach(item => itemStack.block(item.id));
                expect(itemStack.selected).toBe(false);
                expect(itemStack.selectedCount).toEqual(0);
            });

            it('shouldn\'t deselect selected stack when stack gets only blocked partly', () => {
                itemStack.block(item1.id);
                expect(itemStack.selected).toBe(true);
                expect(itemStack.selectedCount).toEqual(2);

                itemStack.block(item2.id);
                expect(itemStack.selected).toBe(true);
                expect(itemStack.selectedCount).toEqual(1);
            });
        });

        describe('unblock all', () => {
            beforeEach(() => {
                itemStack.add(item2);
                itemStack.add(item3);
                itemStack.block(item1.id);
                itemStack.block(item2.id);
            });

            it('should unblock all (consistent state)', () => {
                itemStack.unblockAll();
            });

            it('should unblock all (corrupt state)', () => {
                item1.blocked = false;
                item2.blocked = false;
                itemStack.unblockAll();
            });

            afterEach(() => {
                expect(itemStack.blockedCount).toEqual(0);
                expect(itemStack.availableItemCount).toEqual(3);
                expect(itemStack.blocked).toBe(false);
                expect(item1.blocked).toBeFalsy();
                expect(item2.blocked).toBeFalsy();
                expect(item3.blocked).toBeFalsy();
            });
        });
    });

});
