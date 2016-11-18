import { TestBed, inject } from '@angular/core/testing';
import { AngularFire } from 'angularfire2';
import { AuthService, UserService } from './';

describe('Service: User', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UserService,
                {provide: AngularFire, useValue: {}},
                {provide: AuthService, useValue: {}}
            ]
        });
    });

    it('should ...', inject([UserService], (service: UserService) => {
        expect(service).toBeTruthy();
    }));
});
