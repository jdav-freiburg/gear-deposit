import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(): Observable<boolean> {
        let notAuthorized: Observable<boolean> = this.authService.isAuthorized$().first().map((authorized: boolean) => {
            return !authorized;
        });
        notAuthorized.subscribe((isNotAuthorized: boolean) => {
            if (!isNotAuthorized) {
                console.warn('already authorized -> redirect to root');
                this.router.navigate(['/']);
            }
        });
        return notAuthorized;
    }

}
