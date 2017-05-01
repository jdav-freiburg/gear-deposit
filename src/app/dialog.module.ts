import { NgModule } from '@angular/core';
import { ChangedWarningDialogComponent } from './dialogs/changed-warning';

@NgModule({
    declarations: [
        ChangedWarningDialogComponent
    ],
    exports: [
        ChangedWarningDialogComponent
    ],
    entryComponents: [
        ChangedWarningDialogComponent
    ]
})
export class DialogModule {
}
