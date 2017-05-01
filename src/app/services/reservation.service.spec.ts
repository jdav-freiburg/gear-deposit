import { async } from '@angular/core/testing';
import { Fakes, Mocks } from '../../testing';
import { ReservationService } from './';

describe('Service: ReservationService', () => {

    let service: ReservationService;

    beforeEach(async(() => {
        service = new ReservationService(
            Fakes.createAngularFireFake(),
            Fakes.createItemServiceFake(),
            Fakes.createUserServiceFake());
    }));

    it('should get registered user', () => {
        expect(service.user).toBe(Mocks.MOCKED_REGISTERED_USER);
    });

    it('should get items', () => {
        expect(service.items).toEqual(Mocks.MOCK_ITEMS);
    });

});
