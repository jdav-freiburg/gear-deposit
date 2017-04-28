import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'jgd-changed-warning',
    templateUrl: './changed-warning.dialog.html'
})
export class ChangedWarningDialog {
    constructor(public dialogRef: MdDialogRef<ChangedWarningDialog>) {
    }
}
