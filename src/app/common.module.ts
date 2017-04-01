import { CommonModule as AngularCommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownDirective } from './attribute-directives';
import { HeaderComponent } from './components/header/header.component';
import { ItemStackComponent, SimpleItemListComponent } from './components/items';
import { UiMessageComponent } from './components/ui-messages';
import { GlobalClickDirective } from './directives';
import { TransitionEndDirective } from './directives/transition-end.directive';
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
        DropdownDirective,
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
        DropdownDirective,
        GlobalClickDirective,
        TransitionEndDirective
    ]
})
export class CommonModule {
}
