import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UserService } from '../services';
import { RegisteredUser, Role } from '../model/user';

@Injectable()
export class AdminUserGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) {
    }

    canActivate(): Observable<boolean> {
        const hasAdminRole: Observable<boolean> = this.userService.getRegisteredUser$()
            .map((user: RegisteredUser) => {
                return user.roles !== undefined && !!user.roles.find((role: Role) => {
                        return role === Role.ADMIN;
                    });
            })
            .first();

        hasAdminRole.subscribe((isAdmin: boolean) => {
            console.debug(`#canActivate(); ${isAdmin}`);
            if (!isAdmin) {
                this.router.navigate(['/no-access']);
            }
        });

        return hasAdminRole;
    }

}
