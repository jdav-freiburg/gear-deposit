import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'jgd-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

    @Input() description: string;

    @Input() submitIcon: string = 'save';
    @Input() submitTitle: string = 'Änderungen speichern';

    @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

    private submit(): void {
        this.submitted.emit();
    }

}
