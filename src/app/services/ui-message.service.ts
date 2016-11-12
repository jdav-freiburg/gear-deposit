import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class UiMessageService {

    @Output() public message = new EventEmitter<string>();

    public emitInfo(message: string): void {
        console.debug(`#emitInfo(); will emit '${message}'`);
        this.message.emit(message);
    }

}

