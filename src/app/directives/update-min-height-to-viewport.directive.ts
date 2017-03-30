import { Directive, ElementRef, HostListener, OnInit, Renderer } from '@angular/core';

/**
 * Updates the `min-height` of given element to the available viewport height.
 *
 * It is also connected to the resize event (but ignoring resize events that only changed the height), so that after an orientation change
 * the position of the footer gets updated.
 */
@Directive({
    selector: '[jgdUpdateMinHeightToViewport]'
})
export class UpdateMinHeightToViewportDirective implements OnInit {

    private lastHeight = -1;
    private lastWidth = -1;

    constructor(private el: ElementRef, private renderer: Renderer) {
    }

    ngOnInit(): void {
        this.lastHeight = window.innerHeight;
        this.lastWidth = window.innerWidth;
        this.updateMinHeight();
    }

    @HostListener('window:resize')
    onResize() {
        const height: number = window.innerHeight;
        const width: number = window.innerWidth;
        if (this.lastHeight !== height && this.lastWidth !== width) {
            this.lastHeight = height;
            this.lastWidth = width;
            this.updateMinHeight();
        }
    }

    private updateMinHeight() {
        this.renderer.setElementStyle(this.el.nativeElement, 'min-height', `${this.lastHeight}px`);
    }

}
