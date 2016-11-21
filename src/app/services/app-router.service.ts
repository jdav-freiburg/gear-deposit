import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoute } from '../app.routes';

@Injectable()
export class AppRouterService {

    constructor(private router: Router) {
    }

    public navigateToRoot(): Promise<boolean> {
        return this.router.navigateByUrl('/');
    }

    public navigate(route: AppRoute): Promise<boolean> {
        return this.router.navigateByUrl(`/${route.path}`);
    }

}
