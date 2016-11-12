import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';
import { RegisteredUser, Role } from '../../model/user';

@Injectable()
export class AdminUserGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) {
    }

    canActivate(): Observable<boolean> {
        let hasAdminRole: Observable<boolean> = this.userService.getRegisteredUser()
            .map((user: RegisteredUser) => {
                return user.roles !== undefined && !!user.roles.find((role: Role) => {
                        return role === Role.ADMIN;
                    });
            })
            .first();

        hasAdminRole.subscribe((isAdmin: boolean) => {
            if (!isAdmin) {
                this.router.navigate(['/no-access']);
            }
        });

        return hasAdminRole;
    }

}
