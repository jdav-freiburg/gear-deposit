/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ItemService } from './item.service';
import { AngularFire } from 'angularfire2';

describe('Service: Item', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ItemService, AngularFire]
        });
    });

    it('should ...', inject([ItemService], (service: ItemService) => {
        expect(service).toBeTruthy();
    }));
});
