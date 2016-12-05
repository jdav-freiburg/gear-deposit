import { ItemService } from '.';
import { createAngularFireFake } from '../../testing/fakes';

describe('Service: Item', () => {

    let service: ItemService;

    beforeEach(() => {
        service = new ItemService(createAngularFireFake());
    });

    it('should ...', () => {
        expect(service).toBeTruthy();
    });

});
