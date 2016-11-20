import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';

@Injectable()
export class StandardUserGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) {
    }

    canActivate(): Observable<boolean> {
        let registered: Observable<boolean> = this.userService.isRegistered$().first();
        registered.subscribe((isRegistered: boolean) => {
            if (!isRegistered) {
                console.warn('authorized but not yet registered -> redirect to register');
                this.router.navigate(['/register']);
            }
        });
        return registered;
    }

}
