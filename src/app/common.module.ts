import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemStackComponent, ItemsComponent } from './components/items';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ItemService } from './services';

@NgModule({
    imports: [
        AngularCommonModule,
        FormsModule
    ],
    declarations: [
        NavBarComponent,
        FooterComponent,
        ItemStackComponent,
        ItemsComponent
    ],
    providers: [
        ItemService
    ],
    exports: [
        NavBarComponent,
        FooterComponent,
        ItemStackComponent,
        ItemsComponent
    ]
})
export class CommonModule {
}
