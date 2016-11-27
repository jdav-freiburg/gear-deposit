import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services';

@Injectable()
export class IsAuthorizedGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(): Observable<boolean> {
        let authorized: Observable<boolean> = this.authService.isAuthorized$().first();
        authorized.subscribe((isAuthorized: boolean) => {
            if (!isAuthorized) {
                console.warn('not authorized -> redirect to login');
                this.router.navigate(['/login']);
            }
        });
        return authorized;
    }

}
