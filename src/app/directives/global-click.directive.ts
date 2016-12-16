import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[jgdGlobalClick]'
})
export class GlobalClickDirective {

    @Output() globalClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    @HostListener('document:click', ['$event'])
    onGlobalClick(event: MouseEvent): void {
        this.globalClick.emit(event);
    }

}
