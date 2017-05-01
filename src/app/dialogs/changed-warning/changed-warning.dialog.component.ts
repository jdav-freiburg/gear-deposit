import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'jgd-changed-warning',
    templateUrl: './changed-warning.dialog.component.html'
})
export class ChangedWarningDialogComponent {
    constructor(public dialogRef: MdDialogRef<ChangedWarningDialogComponent>) {
    }
}
