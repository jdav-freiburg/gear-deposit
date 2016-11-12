import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UserAuthStatus } from '../../model/user';
import { AuthService } from '../../services/auth.service';
import { UserAuthStatusService } from '../../services/user-auth-status.service';

@Component({
    selector: 'jgd-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    private userAuthStatus: UserAuthStatus;

    constructor(private authService: AuthService, private userAuthStatusService: UserAuthStatusService, private router: Router) {
    }

    ngOnInit(): void {
        console.trace('#ngOnInit();');
        this.userAuthStatusService.getUserAuthStatus().subscribe((userAuthStatus: UserAuthStatus) => {
            this.userAuthStatus = userAuthStatus;
        });
    }

    private logout(): void {
        console.trace('#logout();');
        this.authService.logout();
        this.userAuthStatus = undefined;
        this.userAuthStatusService.reset();

        let sub: Subscription = this.authService.isAuthorized().subscribe((isAuthorized: boolean) => {
            if (!isAuthorized) {
                sub.unsubscribe();
                this.router.navigate(['/login']);
            }
        });
    }

}
