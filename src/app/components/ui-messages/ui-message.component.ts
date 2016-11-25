import { Component, Input, EventEmitter, Output } from '@angular/core';
import { UiMessage, UiMessageType } from '../../model';

@Component({
    selector: 'jgd-ui-message',
    templateUrl: './ui-message.component.html',
    styleUrls: ['./ui-message.component.scss']
})
export class UiMessageComponent {

    @Input() private asPopup: boolean = false;
    @Input() private message: UiMessage;

    @Output() private click = new EventEmitter<any>();

    get isInfo(): boolean {
        return this.message !== undefined && this.message.type === UiMessageType.INFO;
    }

    get isWarning(): boolean {
        return this.message !== undefined && this.message.type === UiMessageType.WARNING;
    }

    get isError(): boolean {
        return this.message !== undefined && this.message.type === UiMessageType.ERROR;
    }

    private onClick(): void {
        this.click.emit();
    }

}
