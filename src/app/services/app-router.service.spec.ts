import { NavigationExtras, Router, UrlTree } from '@angular/router';
import { ROUTE } from '../app.routes';
import { AppRouterService } from './';

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
        const promise = appRouter.navigateToRoot();
        expect(promise).toBe(fakePromise);
        expect(router.navigateByUrl).toHaveBeenCalledWith('/');
        expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
    });

    it('should navigate to given route', () => {
        const promise = appRouter.navigate(ROUTE.RESERVATIONS);
        expect(promise).toBe(fakePromise);
        expect(router.navigateByUrl).toHaveBeenCalledWith(`/${ROUTE.RESERVATIONS.path}`);
        expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
    });

});
