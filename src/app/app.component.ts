import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { UiMessageService } from './services/ui-message.service';

@Component({
    selector: 'jgd-app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./app.component.scss', '../scss/material.scss', '../scss/material-icons.scss'],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    private loading: boolean = true;

    private showInfo: boolean = false;
    private infoMessage: string = null;

    constructor(private uiMessageService: UiMessageService, private router: Router) {
    }

    ngOnInit(): void {
        this.uiMessageService.message.subscribe((message: string) => {
            this.showInfo = true;
            this.infoMessage = message;
            setTimeout(() => {
                this.showInfo = false;
                this.infoMessage = null;
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

    private hideInfo(): void {
        this.showInfo = false;
        this.infoMessage = null;
    }

}
