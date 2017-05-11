import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DOM, Mocks, Utils } from '../../../../testing';
import { ItemStack } from '../../../model';
import { ItemStackComponent } from './item-stack.component';

describe('ItemStackComponent', () => {

    let fixture: ComponentFixture<ItemStackComponent>;
    let component: ItemStackComponent;

    class Page {
        static get typeLabel(): DebugElement {
            return Utils.debugElementByCss(fixture, '#iTL');
        }

        static get typeText(): string {
            return Utils.textContent(Page.typeLabel);
        }

        static get descriptionLabel(): DebugElement {
            return Utils.debugElementByCss(fixture, 'small');
        }

        static get descriptionText(): string {
            return Utils.textContent(Page.descriptionLabel);
        }

        static get availableBadge(): DebugElement {
            return Utils.debugElementByCss(fixture, '#aB');
        }

        static get availableText(): string {
            return Utils.textContent(Page.availableBadge);
        }

        static get blockedBadge(): DebugElement {
            return Utils.debugElementByCss(fixture, '.badge.blocked');
        }

        static get blockedText(): string {
            return Utils.textContent(Page.blockedBadge);
        }
    }

    let stack: ItemStack;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ItemStackComponent
            ]
        });

        fixture = TestBed.createComponent(ItemStackComponent);
        component = fixture.componentInstance;
        stack = Mocks.createItemStacks(1)[0];
        component.itemStack = stack;
        fixture.detectChanges();
    });

    it('should render defined default stack (no blocked items)', () => {
        expect(Page.typeLabel).toBeDefined();
        expect(Page.descriptionLabel).toBeDefined();
        expect(Page.availableBadge).toBeDefined();
        expect(Page.blockedBadge).not.toBeDefined();

        expect(Page.typeText).toEqual(stack.type);
        expect(Page.descriptionText).toEqual(`(${stack.description})`);
        expect(Page.availableText).toEqual(stack.availableItemCount.toString());
    });

    it('should render blocked state', () => {
        const availableBeforeBlocked: number = stack.availableItemCount;
        stack.block(stack.items.values().next().value.id);
        fixture.detectChanges();
        expect(Page.blockedBadge).toBeDefined();
        expect(Page.blockedText).toEqual('1');
        expect(Page.availableText).toEqual((availableBeforeBlocked - 1).toString());
    });

    it('should emit `tagClicked` when `availableBadge` was clicked', (done) => {
        component.tagClicked.subscribe(() => {
            done();
        });
        DOM.click(Page.availableBadge);
    });

});
