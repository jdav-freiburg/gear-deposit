import { NgModule } from '@angular/core';
import { RouterLinkStubDirective, RouterOutletStubComponent, RouterStub, ActivatedRouteStub } from './';

@NgModule({
    declarations: [
        RouterLinkStubDirective,
        RouterOutletStubComponent
    ],
    providers: [
        RouterStub,
        ActivatedRouteStub
    ]
})
export class TestModule {

}
