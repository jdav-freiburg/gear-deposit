import { Mocks } from '../../testing';
import { Item, ItemStack } from './item';
import { convert } from './item-stack-factory';

describe('item-stack-factory#convert', () => {

    let itemStacks: ItemStack[];
    let items: Item[];

    beforeEach(() => {
        items = [
            Mocks.createMockItem(1),
            Mocks.createMockItem(2),
            new Item(
                '3',
                `changed ${Mocks.MOCK_ITEM_TYPE}`,
                Mocks.MOCK_ITEM_DESCRIPTION,
                Mocks.MOCK_ITEM_SHAPE,
                Mocks.MOCK_ITEM_LABELS
            ),
            new Item(
                '4',
                Mocks.MOCK_ITEM_TYPE,
                `changed ${Mocks.MOCK_ITEM_DESCRIPTION}`,
                Mocks.MOCK_ITEM_SHAPE,
                Mocks.MOCK_ITEM_LABELS
            ),
            new Item(
                '5',
                Mocks.MOCK_ITEM_TYPE,
                Mocks.MOCK_ITEM_DESCRIPTION,
                `changed ${Mocks.MOCK_ITEM_SHAPE}`,
                Mocks.MOCK_ITEM_LABELS
            )
        ];
        itemStacks = convert(items);
    });

    it('should contain the same items', () => {
        expect(itemStacks).toBeDefined();
        expect(itemStacks.length).toEqual(4);

        expect(itemStacks[0].items.size).toEqual(2);
        items.slice(0, 2).forEach(i => expect(itemStacks[0].items.has(i)).toBe(true));

        expect(itemStacks[1].items.size).toEqual(1);
        expect(itemStacks[1].items.has(items[2])).toBe(true);

        expect(itemStacks[2].items.size).toEqual(1);
        expect(itemStacks[2].items.has(items[3])).toBe(true);

        expect(itemStacks[3].items.size).toEqual(1);
        expect(itemStacks[3].items.has(items[4])).toBe(true);
    });

    it('should contain corresponding ItemStack', () => {
        expect(itemStacks).toBeDefined();
        expect(itemStacks.length).toEqual(4);

        expect(itemStacks[0].description).toEqual(items[0].description);
        expect(itemStacks[0].shape).toEqual(items[0].shape);
        expect(itemStacks[0].type).toEqual(items[0].type);

        expect(itemStacks[1].description).toEqual(items[2].description);
        expect(itemStacks[1].shape).toEqual(items[2].shape);
        expect(itemStacks[1].type).toEqual(items[2].type);

        expect(itemStacks[2].description).toEqual(items[3].description);
        expect(itemStacks[2].shape).toEqual(items[3].shape);
        expect(itemStacks[2].type).toEqual(items[3].type);

        expect(itemStacks[3].description).toEqual(items[4].description);
        expect(itemStacks[3].shape).toEqual(items[4].shape);
        expect(itemStacks[3].type).toEqual(items[4].type);
    });

});
