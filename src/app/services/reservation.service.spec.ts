import { async } from '@angular/core/testing';
import { Fakes, Mocks } from '../../testing';
import { Item } from '../model';
import { ReservationService } from './';

describe('Service: ReservationService', () => {

    let service: ReservationService;
    let items: Item[];

    beforeEach(async(() => {
        const itemService = Fakes.createItemServiceFake();

        service = new ReservationService(
            Fakes.createAngularFireFake(),
            itemService,
            Fakes.createUserServiceFake());

        itemService.items$().subscribe(_items => {
            items = _items;
        });
    }));

    it('should get registered user', () => {
        expect(service.user).toBe(Mocks.MOCKED_REGISTERED_USER);
    });

    it('should get items', () => {
        expect(service.items).toEqual(items);
    });

});
