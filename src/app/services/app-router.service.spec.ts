/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppRouterService } from './app-router.service';

describe('Service: AppRouter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppRouterService]
    });
  });

  it('should ...', inject([AppRouterService], (service: AppRouterService) => {
    expect(service).toBeTruthy();
  }));
});
