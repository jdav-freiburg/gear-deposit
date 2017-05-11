import { CommonModule as AngularCommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from './app.material.module';
import { HeaderComponent } from './components/header/header.component';
import { ItemStackComponent, SimpleItemListComponent } from './components/items';
import { UiMessageComponent } from './components/ui-messages';
import { DialogModule } from './dialog.module';
import { ChangedWarningDialogComponent } from './dialogs/changed-warning';
import { TransitionEndDirective } from './directives';
import { ItemFilterPipe } from './pipes';
import { ItemService, LoadingService, UiMessageService } from './services';

@NgModule({
    imports: [
        AppMaterialModule,
        AngularCommonModule,
        FormsModule,
        DialogModule
    ],
    declarations: [
        HeaderComponent,
        SimpleItemListComponent,
        ItemStackComponent,
        ItemFilterPipe,
        UiMessageComponent,
        TransitionEndDirective
    ],
    providers: [
        ItemService,
        ItemFilterPipe,
        LoadingService,
        UiMessageService
    ],
    exports: [
        AppMaterialModule,
        AngularCommonModule,
        FormsModule,

        HeaderComponent,
        SimpleItemListComponent,
        ItemStackComponent,
        ItemFilterPipe,
        ChangedWarningDialogComponent,
        UiMessageComponent,
        TransitionEndDirective
    ]
})
export class CommonModule {
}
