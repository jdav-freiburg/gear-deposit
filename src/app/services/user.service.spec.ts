/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { AngularFire } from 'angularfire2';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

describe('Service: User', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserService, AngularFire, AuthService]
        });
    });

    it('should ...', inject([UserService], (service: UserService) => {
        expect(service).toBeTruthy();
    }));
});
