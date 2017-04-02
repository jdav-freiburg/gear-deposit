import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoute } from '../app.routes';

/**
 * @deprecated use normal angular router
 */
@Injectable()
export class AppRouterService {

    constructor(private router: Router) {
    }

    navigateToRoot(): Promise<boolean> {
        return this.router.navigateByUrl('/');
    }

    navigate(route: AppRoute): Promise<boolean> {
        return this.router.navigateByUrl(`/${route.path}`);
    }

}
