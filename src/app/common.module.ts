import { CommonModule as AngularCommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownDirective } from './attribute-directives';
import { FooterComponent } from './components/footer/footer.component';
import { ItemStackComponent, SimpleItemListComponent } from './components/items';
import { LoadingComponent } from './components/loading/loading.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
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
        NavBarComponent,
        FooterComponent,
        SimpleItemListComponent,
        ItemStackComponent,
        LoadingComponent,
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

        NavBarComponent,
        FooterComponent,
        SimpleItemListComponent,
        ItemStackComponent,
        LoadingComponent,
        ItemFilterPipe,
        UiMessageComponent,
        DropdownDirective,
        GlobalClickDirective,
        TransitionEndDirective
    ]
})
export class CommonModule {
}
