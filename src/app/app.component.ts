import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { UiMessage } from './model';
import { UiMessageService } from './services';
import { LoadingService } from './services/loading.service';

@Component({
    selector: 'jgd-app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        '../scss/bootstrap/customized.scss',
        '../scss/material.scss',
        '../scss/material-icons.scss',
        './app.component.scss'
    ],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    loading: boolean = true;

    showMessage: boolean = false;
    message: UiMessage;

    private delay: any;

    constructor(private uiMessageService: UiMessageService, private loadingService: LoadingService,
                private router: Router) {
    }

    ngOnInit(): void {
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
            }, 2000);
        });

        this.loadingService.loading.subscribe((loading: boolean) => {
            this.loading = loading;
        });

        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                this.loading = false;
            }
            if (event instanceof NavigationStart) {
                this.loading = true;
            }
        });
    }

    hideMessage(): void {
        this.showMessage = false;
        this.message = null;
    }

}
