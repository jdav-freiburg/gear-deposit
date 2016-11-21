import { Router, NavigationExtras, UrlTree } from '@angular/router';
import { AppRouterService } from './';
import { ROUTE } from '../app.routes';

describe('Service: AppRouter', () => {

    let fakePromise: Promise<boolean>;
    let router: Router;
    let appRouter: AppRouterService;

    beforeEach(() => {
        fakePromise = {} as Promise<boolean>;
        router = {
            navigateByUrl: (url: string | UrlTree, extras?: NavigationExtras) => {
                return fakePromise;
            }
        } as Router;
        appRouter = new AppRouterService(router);
        spyOn(router, 'navigateByUrl').and.callThrough();
    });

    it('should navigate to \'/\'', () => {
        let promise = appRouter.navigateToRoot();
        expect(promise).toBe(fakePromise);
        expect(router.navigateByUrl).toHaveBeenCalledWith('/');
        expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
    });

    it('should navigate to given route', () => {
        let promise = appRouter.navigate(ROUTE.RESERVATIONS);
        expect(promise).toBe(fakePromise);
        expect(router.navigateByUrl).toHaveBeenCalledWith(`/${ROUTE.RESERVATIONS.path}`);
        expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
    });

});
