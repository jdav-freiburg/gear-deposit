import { TestBed, inject } from '@angular/core/testing';
import { AngularFire } from 'angularfire2';
import { ItemService, ReservationService, UserService } from './';
import { createItemServiceSpy, createUserServiceSpy } from '../../test-helpers/spies';

describe('Service: Reservation', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ReservationService,
                {provide: AngularFire, useValue: {}},
                {provide: ItemService, useValue: createItemServiceSpy()},
                {provide: UserService, useValue: createUserServiceSpy()}
            ]
        });
    });

    it('should ...', inject([ReservationService], (service: ReservationService) => {
        expect(service).toBeTruthy();
    }));
});
