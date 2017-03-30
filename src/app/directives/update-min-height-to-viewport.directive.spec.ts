import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UpdateMinHeightToViewportDirective } from './';

// 360 x 640 is the resolution of Galaxy S5 in portrait
const GALAXY_S5_PORTRAIT_HEIGHT = 640;
const GALAXY_S5_PORTRAIT_WIDTH = 360;

const DEVICE_KEYBOARD_HEIGHT = 300;

@Component({
    template: '<div idmUpdateMinHeightToViewport></div>'
})
class TestComponent {
}

describe('UpdateMinHeightToViewportDirective', () => {

    let fixture: ComponentFixture<TestComponent>;
    let div: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                UpdateMinHeightToViewportDirective
            ]
        });

        fixture = TestBed.createComponent(TestComponent);
        div = fixture.debugElement.query(By.directive(UpdateMinHeightToViewportDirective));

        (window as any).innerHeight = GALAXY_S5_PORTRAIT_HEIGHT;
        (window as any).innerWidth = GALAXY_S5_PORTRAIT_WIDTH;
        fixture.detectChanges();
    });

    it('should update element with min-height initially', () => {
        expect(div.nativeElement.style.minHeight).toEqual(`${GALAXY_S5_PORTRAIT_HEIGHT}px`);
    });

    it('should not update element with min-height after resize event with height change only', () => {
        (window as any).innerHeight = GALAXY_S5_PORTRAIT_HEIGHT - DEVICE_KEYBOARD_HEIGHT;
        window.dispatchEvent(new Event('resize'));
        fixture.detectChanges();
        expect(div.nativeElement.style.minHeight).toEqual(`${GALAXY_S5_PORTRAIT_HEIGHT}px`);
    });

    it('should update element with min-height after resize event (simulated orientation change)', () => {
        (window as any).innerHeight = GALAXY_S5_PORTRAIT_WIDTH;
        (window as any).innerWidth = GALAXY_S5_PORTRAIT_HEIGHT;
        window.dispatchEvent(new Event('resize'));
        fixture.detectChanges();
        expect(div.nativeElement.style.minHeight).toEqual(`${GALAXY_S5_PORTRAIT_WIDTH}px`);
    });

});
