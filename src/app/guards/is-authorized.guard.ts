import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../services';

@Injectable()
export class IsAuthorizedGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(): Observable<boolean> {
        this.authService.isAuthorized$().subscribe((isAuthorized: boolean) => {
            console.debug(`#canActivate(); ${isAuthorized}`);
            if (!isAuthorized) {
                console.warn('not authorized -> redirect to login');
                this.router.navigate(['/login']);
            }
        });
        return this.authService.isAuthorized$().first();
    }

}
