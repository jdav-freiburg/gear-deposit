import { Mocks } from '../../testing';
import { Item } from './item';

describe('Class: Item', () => {
    let item: Item;

    beforeEach(() => {
        item = Mocks.createMockItem(1);
    });

    it('should have attributes set', () => {
        expect(item.id).toEqual('1');
        expect(item.type).toEqual(Mocks.MOCK_ITEM_TYPE);
        expect(item.description).toEqual(Mocks.MOCK_ITEM_DESCRIPTION);
        expect(item.shape).toEqual(Mocks.MOCK_ITEM_SHAPE);
        expect(item.labels).toEqual(Mocks.MOCK_ITEM_LABELS);
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
