import { Component, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { UiMessage, UiMessageType } from '../../model';

@Component({
    selector: 'jgd-ui-message',
    templateUrl: './ui-message.component.html',
    styleUrls: ['./ui-message.component.scss']
})
export class UiMessageComponent implements OnChanges {

    @Input() private message: UiMessage;
    @Output() private click = new EventEmitter<any>();

    private isError: boolean = false;

    ngOnChanges() {
        if (this.message !== undefined && this.message !== null) {
            this.isError = this.message.type === UiMessageType.ERROR;
        }
    }

    private onClick(): void {
        this.click.emit();
    }

}
