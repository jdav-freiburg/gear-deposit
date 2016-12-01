import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UserService } from '../services';
import { RegisteredUser } from '../model/user';

@Injectable()
export class ConfirmedUserGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) {
    }

    canActivate(): Observable<boolean> {
        this.userService.getRegisteredUser$().subscribe((user: RegisteredUser) => {
            console.debug(`#canActivate(); ${!!user.confirmed}`);
            if (!user.confirmed) {
                this.router.navigate(['/home']);
            }
        });

        return this.userService.getRegisteredUser$()
            .map((user: RegisteredUser) => !!user.confirmed)
            .first();
    }

}
