import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { UiMessage } from './model';
import { LoadingService, UiMessageService } from './services';

const MESSAGE_HIDE_DELAY = 2000;

@Component({
    selector: 'jgd-app',
    styleUrls: [
        './app.component.scss'
    ],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    loading = true;

    showHeader = false;

    showNavigation = false;
    hideBackdrop = true;

    showMessage = false;

    message: UiMessage;

    private delay: any;

    constructor(private uiMessageService: UiMessageService,
                private loadingService: LoadingService,
                private router: Router) {
    }

    ngOnInit() {
        // shows ui message and hides it after a short delay
        this.uiMessageService.messages.subscribe((message: UiMessage) => {
            this.showMessage = true;
            this.message = message;

            if (this.delay !== undefined) {
                clearTimeout(this.delay);
            }

            this.delay = setTimeout(() => {
                this.showMessage = false;
                this.message = null;
                this.delay = undefined;
            }, MESSAGE_HIDE_DELAY);
        });

        // will handle loading state of the app
        this.loadingService.loading.subscribe((loading: boolean) => {
            this.loading = loading;
        });

        // loading state & navigation state also depends on routing
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.loading = false;
                this.showNavigation = false;
                this.showHeader = (event as NavigationEnd).urlAfterRedirects === '/home';
            }
            if (event instanceof NavigationStart) {
                this.loading = true;
            }
        });
    }

    toggleMenu() {
        this.showNavigation = !this.showNavigation;
        if (this.showNavigation) {
            this.hideBackdrop = false;
        }
    }

    onBackdropClick() {
        this.showNavigation = false;
    }

    onTransitionEnd() {
        if (!this.showNavigation) {
            this.hideBackdrop = true;
        }
    }

    hideMessage() {
        this.showMessage = false;
        this.message = null;
    }

}
