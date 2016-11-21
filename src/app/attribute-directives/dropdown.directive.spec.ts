import { Component, DebugElement } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
    template: `
<div jgdDropdown>
    <content> doesn't matter</content>
</div>
`
})
class DropdownTestComponent {

}

describe('Directive: DropdownDirective', () => {

    let fixture: ComponentFixture<DropdownTestComponent>;
    let element: DebugElement;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [
                DropdownDirective,
                DropdownTestComponent
            ]
        }).createComponent(DropdownTestComponent);
        element = fixture.debugElement.query(By.directive(DropdownDirective));
        fixture.detectChanges();
    });

    it('shouldn\'t have \'open\' class set initially', () => {
        expect(element.classes['open']).toBe(false);
    });

    it('should have  \'open\' class set after click on element', () => {
        element.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(element.classes['open']).toBe(true);
    });

});
