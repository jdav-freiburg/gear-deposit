import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UserService } from '../services';

@Injectable()
export class IsRegisteredGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) {
    }

    canActivate(): Observable<boolean> {
        this.userService.isRegistered$().subscribe((isRegistered: boolean) => {
            console.debug(`#canActivate(); ${isRegistered}`);
            if (!isRegistered) {
                console.warn('authorized but not yet registered -> redirect to register');
                this.router.navigate(['/register']);
            }
        });
        return this.userService.isRegistered$().first();
    }

}
