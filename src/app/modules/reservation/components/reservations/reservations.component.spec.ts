import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { createReservationServiceFake, MOCKED_RESERVATIONS } from '../../../../../testing';
import { ItemStackComponent } from '../../../../components/items/item-stack/item-stack.component';
import { SimpleItemListComponent } from '../../../../components/items/simple-item-list/simple-item-list.component';
import { LoadingService, ReservationService, UiMessageService } from '../../../../services';
import { ReservationsComponent } from './reservations.component';

describe('ReservationsComponent', () => {

    let fixture: ComponentFixture<ReservationsComponent>;
    let debugElement: DebugElement;

    let reservationService: ReservationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ReservationsComponent,
                SimpleItemListComponent,
                ItemStackComponent
            ],
            providers: [
                UiMessageService,
                LoadingService,
                {provide: ReservationService, useValue: createReservationServiceFake()},
                {provide: Router, useValue: {}}
            ]
        });

        fixture = TestBed.createComponent(ReservationsComponent);
        debugElement = fixture.debugElement;

        reservationService = debugElement.injector.get(ReservationService);
    });

    it('should emit loading while requesting data and report when data was loaded', () => {
        const loadingService: LoadingService = fixture.debugElement.injector.get(LoadingService);
        const loadEmitted: boolean[] = [];
        loadingService.loading.subscribe(l => loadEmitted.push(l));
        fixture.detectChanges();

        expect(loadEmitted.length).toEqual(2);
        expect(loadEmitted[0]).toBe(true);
        expect(loadEmitted[1]).toBe(false);
    });

    it('should show message when there are no reservations', () => {
        spyOn(reservationService, 'all$').and.returnValue(Observable.of([]));
        fixture.detectChanges();

        expect(debugElement.query(By.css('p')).nativeElement.textContent).toContain('Keine aktuellen Reservierungen');
    });

    it('should render reservations', () => {
        fixture.detectChanges();

        const reservations: DebugElement[] = debugElement.queryAll(By.css('.card'));
        expect(reservations).toBeDefined();
        expect(reservations.length).toEqual(MOCKED_RESERVATIONS.length);
        expect(debugElement.queryAll(By.css('jgd-simple-item-list')).length).toEqual(MOCKED_RESERVATIONS.length);
    });

    // FIXME enable test
    xit('should remove reservation', () => {
        fixture.detectChanges();

        let reservations: DebugElement[] = debugElement.queryAll(By.css('.card'));
        const deleteButton = reservations[1].query(By.css('button'));
        spyOn(reservationService, 'remove').and.callThrough();

        deleteButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(reservationService.remove).toHaveBeenCalledWith(MOCKED_RESERVATIONS[1].id);
        reservations = debugElement.queryAll(By.css('.card'));
        expect(reservations.length).toEqual(MOCKED_RESERVATIONS.length - 1);
        expect(debugElement.queryAll(By.css('jgd-simple-item-list')).length).toEqual(MOCKED_RESERVATIONS.length - 1);
    });

});
