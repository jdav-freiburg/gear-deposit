import { Component, Input } from '@angular/core';

@Component({
    selector: 'jgd-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
    @Input() dark = false;
}
