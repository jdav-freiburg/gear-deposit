import { CommonModule as AngularCommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { ItemStackComponent, SimpleItemListComponent } from './components/items';
import { UiMessageComponent } from './components/ui-messages';
import { GlobalClickDirective, TransitionEndDirective } from './directives';
import { ItemFilterPipe } from './pipes';
import { ItemService, LoadingService, UiMessageService } from './services';

@NgModule({
    imports: [
        AngularCommonModule,
        FormsModule
    ],
    declarations: [
        HeaderComponent,
        SimpleItemListComponent,
        ItemStackComponent,
        ItemFilterPipe,
        UiMessageComponent,
        GlobalClickDirective,
        TransitionEndDirective
    ],
    providers: [
        ItemService,
        ItemFilterPipe,
        LoadingService,
        UiMessageService
    ],
    exports: [
        AngularCommonModule,
        FormsModule,

        HeaderComponent,
        SimpleItemListComponent,
        ItemStackComponent,
        ItemFilterPipe,
        UiMessageComponent,
        GlobalClickDirective,
        TransitionEndDirective
    ]
})
export class CommonModule {
}
