import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DOM, Mocks, Utils } from '../../../../../testing';
import { AppMaterialModule } from '../../../../app.material.module';
import { ItemStackComponent } from '../../../../components/items/item-stack/item-stack.component';
import { ItemStack } from '../../../../model';
import { ReservationItemsComponent } from './reservation-items.component';

describe('ReservationItemsComponent', () => {

    let fixture: ComponentFixture<ReservationItemsComponent>;
    let component: ReservationItemsComponent;

    class Page {
        static get itemEntries(): ItemEntry[] {
            return Utils.debugElementsByCss(fixture, 'li').map(debugElement => {
                return new ItemEntry(debugElement);
            });
        }

        static get selected(): DebugElement[] {
            return Utils.debugElementsByCss(fixture, '.selected');
        }

        static get previousPageButton(): DebugElement {
            return Utils.debugElementByCss(fixture, '#pPB');
        }

        static get nextPageButton(): DebugElement {
            return Utils.debugElementByCss(fixture, '#nPB');
        }

        static get pageDescriptionLabel(): DebugElement {
            return Utils.debugElementByCss(fixture, '#pDL');
        }

        static get pageDescriptionText(): string {
            return Utils.textContent(Page.pageDescriptionLabel);
        }

        static get pageMaxItemsLabel(): DebugElement {
            return Utils.debugElementByCss(fixture, '#mIL');
        }

        static get pageMaxItemsText(): string {
            return Utils.textContent(this.pageMaxItemsLabel);
        }
    }

    class ItemEntry {
        constructor(private debugElement: DebugElement) {
        }

        get itemStackComponent(): DebugElement {
            return this.debugElement.query(By.css('jgd-item-stack'));
        }

        clickItemStackComponent() {
            DOM.click(this.itemStackComponent);
            fixture.detectChanges();
        }

        get checkbox(): DebugElement {
            return this.debugElement.query(By.css('md-checkbox'));
        }

        clickCheckbox() {
            DOM.dispatchEvent(this.checkbox, 'change');
            fixture.detectChanges();
        }

        get availableBadge(): DebugElement {
            return this.debugElement.query(By.css('#aB'));
        }

        get countInput(): HTMLInputElement {
            return this.debugElement.query(By.css('input[name="itemCount"]')).nativeElement;
        }

        get count(): string {
            return this.countInput.value;
        }
    }

    let itemEntry: ItemEntry;
    let stack: ItemStack;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppMaterialModule
            ],
            declarations: [
                ReservationItemsComponent,
                ItemStackComponent
            ]
        });

        fixture = TestBed.createComponent(ReservationItemsComponent);
        component = fixture.componentInstance;
        component.stacks = Mocks.createItemStacks(10);
        component.ngOnChanges({});
        fixture.detectChanges();

        itemEntry = Page.itemEntries[0];
        stack = component.stacks[0];
    });

    it('should render defined stacks', () => {
        expect(Page.itemEntries.length).toEqual(component.stacks.length);
    });

    it('shouldn\'t select anything by default', () => {
        expect(Page.selected.length).toEqual(0);
    });

    describe('(paging)', () => {

        it('should render 1st page', () => {
            expect(component.page).toEqual(1);
            expect(Page.pageDescriptionLabel).toBeDefined();
            expect(Page.pageDescriptionText).toEqual('1 - 10');
            expect(Page.pageMaxItemsLabel).not.toBeDefined();
        });

        it('should disable paging buttons when overall count of stacks is less than defined `maxStacks`', () => {
            expect(component.stacks.length).toBeLessThan(component.maxStacks);
            expect(Page.previousPageButton.nativeElement.disabled).toBe(true);
            expect(Page.nextPageButton.nativeElement.disabled).toBe(true);
        });

        describe('(overall count of stacks is larger than defined `maxStacks`)', () => {

            function testFirstPage() {
                expect(component.page).toEqual(1);
                expect(Page.pageDescriptionLabel).toBeDefined();
                expect(Page.pageDescriptionText).toEqual('1 - 20');
                expect(Page.pageMaxItemsLabel).toBeDefined();
                expect(Page.pageMaxItemsText).toEqual('von 60');
                expect(Page.previousPageButton.nativeElement.disabled).toBe(true);
                expect(Page.nextPageButton.nativeElement.disabled).toBe(false);
            }

            function testSecondPage() {
                expect(component.page).toEqual(2);
                expect(Page.pageDescriptionLabel).toBeDefined();
                expect(Page.pageDescriptionText).toEqual('21 - 40');
                expect(Page.pageMaxItemsLabel).toBeDefined();
                expect(Page.pageMaxItemsText).toEqual('von 60');
                expect(Page.previousPageButton.nativeElement.disabled).toBe(false);
                expect(Page.nextPageButton.nativeElement.disabled).toBe(false);
            }

            beforeEach(() => {
                component.stacks = Mocks.createItemStacks(component.maxStacks * 3);
                component.ngOnChanges({});
                fixture.detectChanges();
            });

            it('should render 1st page', () => {
                testFirstPage();
            });

            it('should navigate to 2nd page (from 1st page)', () => {
                DOM.click(Page.nextPageButton);
                fixture.detectChanges();
                testSecondPage();
            });

            it('should navigate to 1st page (from 2nd page)', () => {
                DOM.click(Page.nextPageButton);
                DOM.click(Page.previousPageButton);
                fixture.detectChanges();
                testFirstPage();
            });

            it('should navigate to 3rd page (from 2nd page)', () => {
                DOM.click(Page.nextPageButton);
                DOM.click(Page.nextPageButton);
                fixture.detectChanges();
                expect(component.page).toEqual(3);
                expect(Page.pageDescriptionText).toEqual('41 - 60');
                expect(Page.pageMaxItemsText).toEqual('von 60');
                expect(Page.previousPageButton.nativeElement.disabled).toBe(false);
                expect(Page.nextPageButton.nativeElement.disabled).toBe(true);
            });

            it('should navigate to 2nd page (from 3rd page)', () => {
                DOM.click(Page.nextPageButton);
                DOM.click(Page.nextPageButton);
                DOM.click(Page.previousPageButton);
                fixture.detectChanges();
                testSecondPage();
            });
        });
    });

    describe('(selecting)', () => {

        function expectStackToBeSelected() {
            expect(Page.selected.length).toEqual(1);
            expect(stack.selected).toBe(true);
        }

        function expectStackToBeNotSelected() {
            expect(Page.selected.length).toEqual(0);
            expect(stack.selected).toBe(false);
        }

        it('should select unselected stack when user clicks checkbox', () => {
            itemEntry.clickCheckbox();
            expectStackToBeSelected();
        });

        it('should deselect selected stack when user clicks checkbox again', () => {
            itemEntry.clickCheckbox();
            itemEntry.clickCheckbox();
            expectStackToBeNotSelected();
        });

        it('should select a not fully blocked stack when user clicks checkbox', () => {
            stack.block(stack.items.values().next().value.id);
            itemEntry.clickCheckbox();
            expectStackToBeSelected();
        });

        it('shouldn\'t select a fully blocked stack when user clicks checkbox', () => {
            stack.items.forEach(item => stack.block(item.id));
            itemEntry.clickCheckbox();
            expectStackToBeNotSelected();
        });

        it('should select unselected stack when user clicks stack component', () => {
            itemEntry.clickItemStackComponent();
            expectStackToBeSelected();
        });

        it('should deselect selected stack when user clicks stack component again', () => {
            itemEntry.clickItemStackComponent();
            itemEntry.clickItemStackComponent();
            expectStackToBeNotSelected();
        });

        it('should select a not fully blocked stack when user clicks stack component', () => {
            stack.block(stack.items.values().next().value.id);
            itemEntry.clickItemStackComponent();
            expectStackToBeSelected();
        });

        it('shouldn\'t select a fully blocked stack when user clicks stack component', () => {
            stack.items.forEach(item => stack.block(item.id));
            itemEntry.clickItemStackComponent();
            expectStackToBeNotSelected();
        });

        // FIXME - implement or remove
        xdescribe('(availableBadge clicked)', () => {
            beforeEach(() => {
                DOM.click(itemEntry.availableBadge);
                fixture.detectChanges();
            });

            it('should select unselected stack when user clicks "availableBadge"', () => {
                expectStackToBeSelected();
            });

            it('shouldn\'t deselect selected stack when user clicks "availableBadge" again', () => {
                DOM.click(itemEntry.availableBadge);
                fixture.detectChanges();
                expectStackToBeSelected();
            });
        });
    });

    it('should update item count to maximum if "availableBadge" was clicked', () => {
        DOM.dispatchEvent(itemEntry.itemStackComponent, 'tagClicked');
        fixture.detectChanges();
        expect(itemEntry.count).toEqual(stack.availableItemCount.toString());
    });

    it('should disable `countInput` when stack is blocked', () => {
        stack.items.forEach(item => stack.block(item.id));
        fixture.detectChanges();
        expect(itemEntry.countInput.disabled).toBe(true);
    });

});
