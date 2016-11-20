import { ItemFilterPipe } from './item-filter.pipe';
import { createMockItem } from '../../testing/mocks';
import { Item } from '../model/item';

describe('Pipe: ItemFilter', () => {
    let pipe: ItemFilterPipe;
    let items: Item[];
    let filtered: Item[];

    beforeEach(() => {
        pipe = new ItemFilterPipe();
        items = [
            createMockItem(1),
            createMockItem(2),
            createMockItem(3),
            createMockItem(4),
            createMockItem(5),
            createMockItem(6)
        ];
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('shouldn\'t filter anything when no filter specified', () => {
        filtered = pipe.transform(items, undefined);
        expect(filtered).toBeDefined();
        expect(filtered).toEqual(items);
    });

    it('shouldn\'t filter anything when only empty filter specified', () => {
        filtered = pipe.transform(items, '');
        expect(filtered).toBeDefined();
        expect(filtered).toEqual(items);
    });

    it('should filter based on description', () => {
        items[1].description = '60m, blau';

        filtered = pipe.transform(items, '60m');
        expect(filtered).toBeDefined();
        expect(filtered.length).toEqual(1);
        expect(filtered[0]).toBe(items[1]);
    });

    it('should filter based on description (combined filters)', () => {
        items[1].description = '60m, blau';
        items[2].description = '60m, rot';

        filtered = pipe.transform(items, '60m blau');
        expect(filtered).toBeDefined();
        expect(filtered.length).toEqual(1);
        expect(filtered[0]).toBe(items[1]);
    });

    it('should filter based on type', () => {
        items[1].type = 'Seil';

        filtered = pipe.transform(items, 'Se');
        expect(filtered).toBeDefined();
        expect(filtered.length).toEqual(1);
        expect(filtered[0]).toBe(items[1]);
    });

    it('should filter based on labels', () => {
        items[1].labels = [
            'Klettern',
            'Sommer'
        ];
        items[2].labels = [
            'Klettern',
            'Hochtour',
            'Sommer'
        ];

        filtered = pipe.transform(items, 'Kle Hoch');
        expect(filtered).toBeDefined();
        expect(filtered.length).toEqual(1);
        expect(filtered[0]).toBe(items[2]);
    });

    it('should filter based on type and description (combined filters)', () => {
        items[1].type = 'Halbseil';
        items[1].description = '60m, blau';
        items[2].type = 'Halbseil';
        items[2].description = '60m, rot';

        filtered = pipe.transform(items, 'Se blau');
        expect(filtered).toBeDefined();
        expect(filtered.length).toEqual(1);
        expect(filtered[0]).toBe(items[1]);
    });

    it('should filter based on type, description and labels (combined filters)', () => {
        items[1].type = 'Halbseil';
        items[1].description = '60m, blau';
        items[1].labels = [
            'Klettern',
            'Hochtour'
        ];
        items[2].type = 'Halbseil';
        items[2].description = '60m, rot';
        items[2].labels = [
            'Klettern',
            'Hochtour'
        ];
        items[3].type = 'Einfachseil';
        items[3].description = '70m, blau';

        filtered = pipe.transform(items, 'Se blau Kle');
        expect(filtered).toBeDefined();
        expect(filtered.length).toEqual(1);
        expect(filtered[0]).toBe(items[1]);
    });

    it('should slice filtered items', () => {
        filtered = pipe.transform(items, undefined, 2);
        expect(filtered).toBeDefined();
        expect(filtered.length).toEqual(2);
        expect(filtered[0]).toBe(items[0]);
        expect(filtered[1]).toBe(items[1]);
    });

    it('should filter based on description (combined filters) and slice filtered items', () => {
        items[1].description = '60m, blau';
        items[2].description = '60m, blau';
        items[3].description = '60m, rot';

        filtered = pipe.transform(items, '60m blau', 1);
        expect(filtered).toBeDefined();
        expect(filtered.length).toEqual(1);
        expect(filtered[0]).toBe(items[1]);
    });

    it('should filter based on type and slice filtered items', () => {
        items[1].type = 'Seil';
        items[2].type = 'Seil';
        items[3].type = 'Seil';
        items[4].type = 'Seil';

        filtered = pipe.transform(items, 'Se', 3);
        expect(filtered).toBeDefined();
        expect(filtered.length).toEqual(3);
        expect(filtered[0]).toBe(items[1]);
        expect(filtered[1]).toBe(items[2]);
        expect(filtered[2]).toBe(items[3]);
    });

});
