import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { UserAuthStatus, RegisteredUser, Role } from '../model/user';

@Injectable()
export class UserAuthStatusService {

    private userAuthStatus: UserAuthStatus = <UserAuthStatus>{
        isAuthorized: false,
        isRegistered: false
    };

    constructor(private authService: AuthService, private userService: UserService) {
        this.init();
    }

    private init() {
        this.authService.isAuthorized$().subscribe((isAuthorized: boolean) => {
            this.userAuthStatus.isAuthorized = isAuthorized;
            this.userService.getRegisteredUser$().subscribe((user: RegisteredUser) => {
                if (user !== undefined) {
                    const roles = user.roles ? user.roles : [];
                    this.userAuthStatus.isRegistered = true;
                    this.userAuthStatus.hasAdminRole = !!roles.find((role: Role) => {
                        return role === Role.ADMIN;
                    });
                } else {
                    this.userAuthStatus.isRegistered = false;
                }
            });
        });
    }

    getUserAuthStatus$(): Observable<UserAuthStatus> {
        return Observable.from([this.userAuthStatus]);
    }

    reset(): void {
        this.userAuthStatus.isAuthorized = false;
        this.userAuthStatus.isRegistered = false;
        this.userAuthStatus.hasAdminRole = false;
        this.authService.reset();
        this.userService.reset();
    }

}
