import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { UiMessage } from './model';
import { UiMessageService } from './services';

@Component({
    selector: 'jgd-app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./app.component.scss', '../scss/material.scss', '../scss/material-icons.scss'],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    private loading: boolean = true;

    private showMessage: boolean = false;
    private message: UiMessage = null;

    constructor(private uiMessageService: UiMessageService, private router: Router) {
    }

    ngOnInit(): void {
        this.uiMessageService.messages.subscribe((message: UiMessage) => {
            this.showMessage = true;
            this.message = message;
            setTimeout(() => {
                this.showMessage = false;
                this.message = null;
            }, 2000);
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

    private hideMessage(): void {
        this.showMessage = false;
        this.message = null;
    }

}
