import { NgModule } from '@angular/core';
import { AppModule } from '../app';
import { RouterLinkStubDirective, RouterOutletStubComponent } from './router-stubs';

/**
 * Needed so that `aot` build is working. But it isn't used throughout our tests and/or app.
 */
@NgModule({
    imports: [
        AppModule
    ],
    declarations: [
        RouterLinkStubDirective,
        RouterOutletStubComponent
    ]
})
export class FakeRouterModule {

}
