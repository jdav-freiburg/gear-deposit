import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'jgd-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

    /**
     * Can be used for adding a css class to the footer which will lead to different styling.
     * Supported in css right now: `mobile-maximized`
     */
    @Input() state?: string;

    @Input() description: string;
    @Input() descriptionIcon?: string;

    @Input() submitIcon: string = 'save';
    @Input() submitTitle: string = 'Änderungen speichern';

    @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

    private submit(): void {
        this.submitted.emit();
    }

}
