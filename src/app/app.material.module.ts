import { NgModule } from '@angular/core';
import { MdButtonModule, MdCheckboxModule, MdDialogModule, MdInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MdButtonModule,
        MdCheckboxModule,
        MdInputModule,
        MdDialogModule,
    ],
    exports: [
        MdButtonModule,
        MdCheckboxModule,
        MdInputModule,
        MdDialogModule
    ]
})
export class AppMaterialModule {
}
