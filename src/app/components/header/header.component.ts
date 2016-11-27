import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UserAuthStatus } from '../../model';
import { AuthService, UserAuthStatusService } from '../../services';

@Component({
    selector: 'jgd-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    private userAuthStatus: UserAuthStatus;

    constructor(private authService: AuthService, private userAuthStatusService: UserAuthStatusService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.userAuthStatusService.getUserAuthStatus$().subscribe((userAuthStatus: UserAuthStatus) => {
            this.userAuthStatus = userAuthStatus;
        });
    }

    private logout(): void {
        console.log('#logout();');
        this.authService.logout();
        this.userAuthStatus = undefined;
        this.userAuthStatusService.reset();

        let sub: Subscription = this.authService.isAuthorized$().subscribe((isAuthorized: boolean) => {
            if (!isAuthorized) {
                sub.unsubscribe();
                this.router.navigate(['/login']);
            }
        });
    }

}
