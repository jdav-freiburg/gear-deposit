import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'jgd-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

    @Input() enableToggle?: boolean;

    @Input() description: string;

    @Input() showSubmit: boolean = false;
    @Input() submitIcon: string = 'save';
    @Input() submitTitle: string = 'Änderungen speichern';

    @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

    toggled: boolean = true;

    submit(): void {
        this.submitted.emit();
    }

    toggle(): void {
        this.toggled = !this.toggled;
    }

    onGlobalClick(event: MouseEvent): void {
        if (!this.toggled) {
            console.log(event);
        }
    }

    public open(): void {
        this.toggled = false;
    }

}
