import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LoadingService {

    loading: EventEmitter<boolean> = new EventEmitter<boolean>();

    public emitLoading(loading: boolean): void {
        this.loading.emit(loading);
    }

}
