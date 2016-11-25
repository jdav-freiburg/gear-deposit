import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'jgd-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

    @Input() enableToggle?: boolean;
    @Input() enableSubmit: boolean = true;

    @Input() description: string;

    @Input() submitIcon: string = 'save';
    @Input() submitTitle: string = 'Änderungen speichern';

    @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

    private toggled: boolean = true;

    private submit(): void {
        this.submitted.emit();
    }

    private toggle(): void {
        this.toggled = !this.toggled;
    }

    private onGlobalClick(event: MouseEvent): void {
        if (!this.toggled) {
            console.log(event);
        }
    }

    public open(): void {
        this.toggled = false;
    }

}
