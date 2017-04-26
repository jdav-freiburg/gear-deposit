import { NgModule } from '@angular/core';
import { MdButtonModule, MdCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MdButtonModule,
        MdCheckboxModule
    ],
    exports: [
        MdButtonModule,
        MdCheckboxModule
    ]
})
export class AppMaterialModule {
}
