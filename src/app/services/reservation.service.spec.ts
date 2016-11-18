import { TestBed, inject } from '@angular/core/testing';
import { AngularFire } from 'angularfire2';
import { ItemService, ReservationService } from './';

describe('Service: Reservation', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ReservationService,
                {provide: AngularFire, useValue: {}},
                {provide: ItemService, useValue: {}}
            ]
        });
    });

    it('should ...', inject([ReservationService], (service: ReservationService) => {
        expect(service).toBeTruthy();
    }));
});
