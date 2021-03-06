import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UserAuthStatusService } from '../services';
import { UserAuthStatus } from '../model/user';

@Injectable()
export class IsAlreadyRegisteredGuard implements CanActivate {

    constructor(private userAuthStatusService: UserAuthStatusService, private router: Router) {
    }

    canActivate(): Observable<boolean> {
        const userAuthStatus: Observable<boolean> = this.userAuthStatusService.getUserAuthStatus$()
            .map((uAS: UserAuthStatus) => {
                return uAS.isAuthorized && !uAS.isRegistered;
            })
            .first();
        userAuthStatus.subscribe((authorizedAndNotRegistered: boolean) => {
            console.debug(`#canActivate(); ${authorizedAndNotRegistered}`);
            if (!authorizedAndNotRegistered) {
                console.warn('already registered -> redirect to root');
                this.router.navigate(['/']);
            }
        }, (error: any) => {
            console.error(error);
        });
        return userAuthStatus;
    }

}
