import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../services';

@Injectable()
export class IsAlreadyAuthorizedGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(): Observable<boolean> {
        this.authService.isAuthorized$().subscribe((isAuthorized: boolean) => {
            console.debug(`#canActivate(); ${!isAuthorized}`);
            if (isAuthorized) {
                console.warn('already authorized -> redirect to root');
                this.router.navigate(['/']);
            }
        });
        return this.authService.isAuthorized$()
            .map(
                (authorized: boolean) => !authorized
            )
            .first();
    }

}
