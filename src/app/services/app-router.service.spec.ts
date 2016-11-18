import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppRouterService } from './';

describe('Service: AppRouter', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AppRouterService,
                {provide: Router, useValue: {}}
            ]
        });
    });

    it('should ...', inject([AppRouterService], (service: AppRouterService) => {
        expect(service).toBeTruthy();
    }));
});
