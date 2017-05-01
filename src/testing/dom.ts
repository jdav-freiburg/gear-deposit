import { DebugElement } from '@angular/core';

export const ButtonClickEvents = {
    left: {button: 0},
    right: {button: 2}
};

export namespace DOM {

    export function updateValue(element: DebugElement, value: string) {
        element.nativeElement.value = value;
        dispatchEvent(element, 'input');
    }

    export function dispatchEvent(element: DebugElement, eventType: string) {
        element.nativeElement.dispatchEvent(createEvent(eventType));
    }

    export function createEvent(eventType: string): Event {
        const evt: Event = document.createEvent('Event');
        evt.initEvent(eventType, true, true);
        return evt;
    }

    export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
        if (el instanceof HTMLElement) {
            el.click();
        } else {
            el.triggerEventHandler('click', eventObj);
        }
    }

}


