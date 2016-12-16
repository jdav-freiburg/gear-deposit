import { Observable } from 'rxjs/Rx';
import { ReservationService } from './';
import { createAngularFireFake, createUserServiceFake, createItemServiceFake } from '../../testing/fakes';
import { MOCKED_REGISTERED_USER, createMockItem } from '../../testing/mocks';
import { Item } from '../model/item';

describe('Service: ReservationService', () => {

    let service: ReservationService;
    let items: Item[];

    beforeEach(() => {
        let itemService = createItemServiceFake();
        items = [
            createMockItem(1),
            createMockItem(2)
        ];

        spyOn(itemService, 'items$').and.returnValue(Observable.from([items]));

        service = new ReservationService(
            createAngularFireFake(),
            itemService,
            createUserServiceFake());
    });

    it('should get registered user', () => {
        expect(service.user).toBe(MOCKED_REGISTERED_USER);
    });

    it('should get items', () => {
        expect(service.items).toEqual(items);
    });

});
