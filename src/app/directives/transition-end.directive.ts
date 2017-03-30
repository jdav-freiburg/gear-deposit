import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[jgdTransitionEnd]'
})
export class TransitionEndDirective {

    @Output() transitionEnd: EventEmitter<TransitionEvent> = new EventEmitter<TransitionEvent>();

    constructor(private el: ElementRef) {
    }

    @HostListener('transitionend', ['$event'])
    onTransitionEnd(event: TransitionEvent): void {
        if (event.target === this.el.nativeElement) {
            this.transitionEnd.emit(event);
        }
    }

}
