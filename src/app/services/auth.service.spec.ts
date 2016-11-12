/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { AngularFire } from 'angularfire2';
import { AuthService } from './auth.service';

describe('Service: AuthService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthService, AngularFire]
        });
    });

    it('should ...', inject([AuthService], (service: AuthService) => {
        expect(service).toBeTruthy();
    }));
});
