import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class Utils {

    static debugElementByCss(fixture: ComponentFixture<any>, css: string): DebugElement {
        const debugElement: DebugElement = fixture.debugElement.query(By.css(css));
        return debugElement ? debugElement : undefined;
    }

    static debugElementsByCss(fixture: ComponentFixture<any>, css: string): DebugElement[] {
        const debugElements: DebugElement[] = fixture.debugElement.queryAll(By.css(css));
        return debugElements ? debugElements : [];
    }

}
