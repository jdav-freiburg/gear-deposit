import { Item } from './item';
import {
    createMockItem,
    MOCK_ITEM_TYPE,
    MOCK_ITEM_DESCRIPTION,
    MOCK_ITEM_SHAPE,
    MOCK_ITEM_LABELS
} from '../../testing';

describe('Class: Item', () => {
    let item: Item;

    beforeEach(() => {
        item = createMockItem(1);
    });

    it('should have attributes set', () => {
        expect(item.id).toEqual('1');
        expect(item.type).toEqual(MOCK_ITEM_TYPE);
        expect(item.description).toEqual(MOCK_ITEM_DESCRIPTION);
        expect(item.shape).toEqual(MOCK_ITEM_SHAPE);
        expect(item.labels).toEqual(MOCK_ITEM_LABELS);
    });

    it('should return true when shape equals \'ok\'', () => {
        expect(item.isOk()).toBe(true);

        item.shape = ' Ok ';
        expect(item.isOk()).toBe(true);
    });

    it('should return true when shape doesn\'t equals \'ok\'', () => {
        item.shape = 'ok_';
        expect(item.isOk()).toBe(false);

        item.shape = 'defect';
        expect(item.isOk()).toBe(false);
    });

});
