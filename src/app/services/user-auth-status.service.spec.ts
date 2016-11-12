/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { UserAuthStatusService } from './user-auth-status.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

describe('Service: UserAuthStatus', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserAuthStatusService, AuthService, UserService]
        });
    });

    it('should ...', inject([UserAuthStatusService, AuthService, UserService], (service: UserAuthStatusService) => {
        expect(service).toBeTruthy();
    }));
});
