import { TestBed, inject } from '@angular/core/testing';
import { AngularFire } from 'angularfire2';
import { AuthService } from './';

describe('Service: AuthService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                {provide: AngularFire, useValue: {}}
            ]
        });
    });

    it('should ...', inject([AuthService], (service: AuthService) => {
        expect(service).toBeTruthy();
    }));
});
