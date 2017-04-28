import { AfterContentInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'jgd-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterContentInit {

    @Input() color = 'primary';

    @ViewChild('header') header: ElementRef;
    @ViewChild('placeholder') placeholder: ElementRef;

    constructor(private renderer: Renderer2) {
    }

    ngAfterContentInit(): void {
        const headerHeight: number = this.header.nativeElement.offsetHeight;
        this.renderer.setStyle(this.placeholder.nativeElement, 'height', `${headerHeight}px`);
    }

}
