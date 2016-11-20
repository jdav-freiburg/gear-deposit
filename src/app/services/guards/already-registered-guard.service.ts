import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserAuthStatusService } from '../user-auth-status.service';
import { UserAuthStatus } from '../../model/user';

@Injectable()
export class AlreadyRegisteredGuard implements CanActivate {

    constructor(private userAuthStatusService: UserAuthStatusService, private router: Router) {
    }

    canActivate(): Observable<boolean> {
        let userAuthStatus: Observable<boolean> = this.userAuthStatusService.getUserAuthStatus$().first().map(
            (uAS: UserAuthStatus) => {
                return uAS.isAuthorized && !uAS.isRegistered;
            });
        userAuthStatus.subscribe((authorizedAndNotRegistered: boolean) => {
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
