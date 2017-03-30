import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'jgd-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    @Output() appLogoClick: EventEmitter<void> = new EventEmitter<void>();

}
