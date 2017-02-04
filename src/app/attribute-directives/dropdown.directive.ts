import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[jgdDropdown]'
})
export class DropdownDirective {

    private opened = false;

    @HostBinding('class.open') get isOpened() {
        return this.opened;
    }

    @HostListener('click') onClick() {
        this.opened = !this.opened;
    }

}
