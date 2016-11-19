import { Injectable, EventEmitter } from '@angular/core';
import { UiMessage, UiMessageType } from '../model';

@Injectable()
export class UiMessageService {

    messages: EventEmitter<UiMessage> = new EventEmitter<UiMessage>();

    public emitInfo(message: string): void {
        console.debug(`#emitInfo(); will info: '${message}'`);
        this.messages.emit(<UiMessage>{
            type: UiMessageType.INFO,
            message: message
        });
    }

    public emitError(message: string): void {
        console.debug(`#emitError(); will error: '${message}'`);
        this.messages.emit(<UiMessage>{
            type: UiMessageType.ERROR,
            message: message
        });
    }

}

