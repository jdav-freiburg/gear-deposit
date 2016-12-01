import { Observable } from 'rxjs/Rx';
import { ReservationService } from './';
import { createAngularFireFake, createUserServiceFake, createItemServiceFake } from '../../testing/fakes';
import { MOCKED_REGISTERED_USER, createMockItem } from '../../testing/mocks';
import { Item } from '../model/item';

describe('Service: Reservation', () => {

    let service: ReservationService;

    beforeEach(() => {
        service = new ReservationService(
            createAngularFireFake(),
            createItemServiceFake(),
            createUserServiceFake());
    });

    it('should get registered user', () => {
        expect(service.user).toBe(MOCKED_REGISTERED_USER);
    });

    it('should get items', () => {
        let service;
        let itemService = createItemServiceFake();
        let items: Item[] = [
            createMockItem(1),
            createMockItem(2)
        ];
        spyOn(itemService, 'items$').and.returnValue(Observable.from([items]));

        service = new ReservationService(
            createAngularFireFake(),
            itemService,
            createUserServiceFake());

        expect(service.items).toEqual(items);
    });

});
