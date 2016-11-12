import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'jgd-info-message',
    templateUrl: './info-message.component.html'
})
export class InfoMessageComponent {

    @Input() message: string;
    @Output() click = new EventEmitter<any>();

    private onClick(): void {
        this.click.emit();
    }

}
