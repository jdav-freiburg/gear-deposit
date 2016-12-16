import { Component, Input, EventEmitter, Output } from '@angular/core';
import { UiMessage, UiMessageType } from '../../model';

@Component({
    selector: 'jgd-ui-message',
    templateUrl: './ui-message.component.html',
    styleUrls: ['./ui-message.component.scss']
})
export class UiMessageComponent {

    @Input() asPopup: boolean = false;
    @Input() message: UiMessage;

    @Output() click = new EventEmitter<any>();

    get isInfo(): boolean {
        return this.message !== undefined && this.message.type === UiMessageType.INFO;
    }

    get isWarning(): boolean {
        return this.message !== undefined && this.message.type === UiMessageType.WARNING;
    }

    get isError(): boolean {
        return this.message !== undefined && this.message.type === UiMessageType.ERROR;
    }

    onClick(): void {
        this.click.emit();
    }

}
