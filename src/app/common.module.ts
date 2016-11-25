import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { UiMessageComponent } from './components/ui-messages';
import { ItemStackComponent, ItemsComponent, SimpleItemListComponent } from './components/items';
import { DropdownDirective } from './attribute-directives';
import { GlobalClickDirective } from './directives';
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
        ItemsComponent,
        LoadingComponent,
        ItemFilterPipe,
        UiMessageComponent,
        DropdownDirective,
        GlobalClickDirective
    ],
    providers: [
        ItemService,
        ItemFilterPipe,
        LoadingService,
        UiMessageService
    ],
    exports: [
        NavBarComponent,
        FooterComponent,
        SimpleItemListComponent,
        ItemStackComponent,
        ItemsComponent,
        LoadingComponent,
        ItemFilterPipe,
        UiMessageComponent,
        DropdownDirective,
        GlobalClickDirective
    ]
})
export class CommonModule {
}
