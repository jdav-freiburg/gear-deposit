import { Location, PathLocationStrategy } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMaterialModule } from 'app/app.material.module';
import { Subject } from 'rxjs/Subject';
import { click, DOM, Fakes, ONE_DAY, Utils } from '../../../../../testing';
import { HeaderComponent } from '../../../../components/header/header.component';
import { ItemStackComponent } from '../../../../components/items/item-stack/item-stack.component';
import { DialogModule } from '../../../../dialog.module';
import { ChangedWarningDialogComponent } from '../../../../dialogs/changed-warning';
import { ItemFilterPipe } from '../../../../pipes';
import { LoadingService, ReservationService, UiMessageService } from '../../../../services';
import { ReservationStateService } from '../../services/reservation-state.service';
import { ReservationItemsComponent } from '../reservation-items/reservation-items.component';
import { NewReservationComponent } from './new-reservation.component';

const NOW = Date.now();

const RESERVATION_NAME = 'test description';
const RESERVATION_BEGIN = new Date(NOW);
const RESERVATION_END = new Date(NOW + ONE_DAY);

describe('NewReservationComponent', () => {

    let fixture: ComponentFixture<NewReservationComponent>;

    class Page {
        static get cancelButton(): DebugElement {
            return Utils.debugElementByCss(fixture, '#cancel');
        }

        static get saveButton(): DebugElement {
            return Utils.debugElementByCss(fixture, 'button[type="submit"]');
        }

        static get nameInput(): DebugElement {
            return Utils.debugElementByCss(fixture, 'input[placeholder="Name der Ausfahrt"]');
        }

        static get beginInput(): DebugElement {
            return Utils.debugElementByCss(fixture, 'input[placeholder="Beginn der Reservierung"]');
        }

        static get endInput(): DebugElement {
            return Utils.debugElementByCss(fixture, 'input[placeholder="Ende der Reservierung"]');
        }

        static get itemListEntries(): DebugElement[] {
            return Utils.debugElementsByCss(fixture, 'jgd-item-stack');
        }
    }

    let reservationService: ReservationService;
    let reservationState: ReservationStateService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppMaterialModule,
                ReactiveFormsModule,
                RouterTestingModule,
                DialogModule
            ],
            declarations: [
                HeaderComponent,
                ItemStackComponent,
                ReservationItemsComponent,
                NewReservationComponent
            ],
            providers: [
                Location,
                PathLocationStrategy,
                UiMessageService,
                LoadingService,
                ReservationStateService,
                ItemFilterPipe,
                ...Fakes.PROVIDERS
            ]
        });

        fixture = TestBed.createComponent(NewReservationComponent);

        reservationService = TestBed.get(ReservationService);
        reservationState = TestBed.get(ReservationStateService);

        fixture.detectChanges();
    });

    it('should create component', () => {
        expect(fixture).toBeDefined();
    });

    it('should render elements', () => {
        expect(Page.cancelButton).toBeDefined();
        expect(Page.saveButton).toBeDefined();
        expect(Page.nameInput).toBeDefined();
        expect(Page.beginInput).toBeDefined();
        expect(Page.endInput).toBeDefined();

        expect(Page.itemListEntries.length).toBeGreaterThan(0);
        expect(Page.itemListEntries.length).toEqual(fixture.componentInstance.stacks.length);
    });

    describe('(cancel button)', () => {
        let location: Location;

        beforeEach(() => {
            location = TestBed.get(Location);
            spyOn(location, 'back');
        });

        it('should cancel without prompt if there is no user input', () => {
            click(Page.cancelButton);
            expect(location.back).toHaveBeenCalled();
        });

        describe('(user changed page)', () => {

            let dialog: MdDialog;
            let dialogRef: MdDialogRef<void>;

            beforeEach(() => {
                dialog = TestBed.get(MdDialog);
                dialogRef = Fakes.createMdDialogRefFake();
                spyOn(dialog, 'open').and.returnValue(dialogRef);
                DOM.updateValue(Page.nameInput, RESERVATION_NAME);
                fixture.detectChanges();
                click(Page.cancelButton);
            });

            it('shouldn\'t cancel if user cancels but changed the page', () => {
                expect(location.back).not.toHaveBeenCalled();
            });

            it('should show warning dialog if user cancels but changed the page', () => {
                expect(dialog.open).toHaveBeenCalledWith(ChangedWarningDialogComponent);
            });

            it('should cancel if user approves', () => {
                (dialogRef.afterClosed() as Subject<any>).next(true);
                expect(location.back).toHaveBeenCalled();
            });

            it('shouldn\'t cancel if user doesn\'t approve', () => {
                (dialogRef.afterClosed() as Subject<any>).next(false);
                expect(location.back).not.toHaveBeenCalled();
            });
        });
    });

    describe('(save button)', () => {
        it('should disable save button when there is no user input', () => {
            expect(Page.saveButton.properties.disabled).toBe(true);
        });

        it('shouldn\'t disable save button when user changed the page', () => {
            DOM.updateValue(Page.nameInput, RESERVATION_NAME);
            fixture.detectChanges();
            // gets changed to `null`
            expect(Page.saveButton.properties.disabled).toBeFalsy();
        });

        describe('(user changed page)', () => {

            beforeEach(() => {
                spyOn(reservationService, 'add').and.callThrough();
                DOM.updateValue(Page.nameInput, RESERVATION_NAME);
                DOM.updateValue(Page.beginInput, Utils.formatDate(RESERVATION_BEGIN));
                DOM.updateValue(Page.endInput, Utils.formatDate(RESERVATION_END));
                DOM.click(Page.itemListEntries[0]);
                fixture.detectChanges();
            });

            describe('(incomplete form data)', () => {
                it('shouldn\'t save when user missed to set name', () => {
                    DOM.updateValue(Page.nameInput, null);
                });

                it('shouldn\'t save when user missed to set begin', () => {
                    DOM.updateValue(Page.beginInput, null);
                });

                it('shouldn\'t save when user missed to set end', () => {
                    DOM.updateValue(Page.endInput, null);
                });

                it('shouldn\'t save when user missed to select an item', () => {
                    DOM.click(Page.itemListEntries[0]);
                });

                afterEach(() => {
                    DOM.click(Page.saveButton);
                    expect(reservationService.add).not.toHaveBeenCalled();
                });
            });

            it('should save when user successfully set data', () => {
                DOM.click(Page.saveButton);
                expect(reservationService.add).toHaveBeenCalled();
            });
        });
    });

});
