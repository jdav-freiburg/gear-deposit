import { TestBed, inject } from '@angular/core/testing';
import { AngularFire } from 'angularfire2';
import { ItemService } from '.';

describe('Service: Item', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ItemService,
                {provide: AngularFire, useValue: {}}
            ]
        });
    });

    it('should ...', inject([ItemService], (service: ItemService) => {
        expect(service).toBeTruthy();
    }));
});
