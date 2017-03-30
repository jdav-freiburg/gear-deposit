import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class LoadingService {

    loading: EventEmitter<boolean> = new EventEmitter<boolean>();

    emitLoading(loading: boolean): void {
        this.loading.emit(loading);
    }

}
