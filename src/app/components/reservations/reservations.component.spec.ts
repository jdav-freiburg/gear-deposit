import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ReservationsComponent } from './reservations.component';
import { ItemStackComponent } from '../items';
import { LoadingService, ReservationService, UiMessageService } from '../../services';
import { createReservationServiceFake, MOCKED_RESERVATIONS } from '../../../testing';
import { SimpleItemListComponent } from '../items/simple-item-list/simple-item-list.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Rx';

describe('ReservationsComponent', () => {

    let fixture: ComponentFixture<ReservationsComponent>;
    let debugElement: DebugElement;

    let reservationService: ReservationService;

    beforeEach(async(() => {
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
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReservationsComponent);
        debugElement = fixture.debugElement;

        reservationService = debugElement.injector.get(ReservationService);
    });

    it('should emit loading while requesting data and report when data was loaded', () => {
        let loadingService: LoadingService = fixture.debugElement.injector.get(LoadingService);
        let loadEmitted: boolean[] = [];
        loadingService.loading.subscribe(l => loadEmitted.push(l));
        fixture.detectChanges();

        expect(loadEmitted.length).toEqual(2);
        expect(loadEmitted[0]).toBe(true);
        expect(loadEmitted[1]).toBe(false);
    });

    it('should show message when there are no reservations', () => {
        let reservationService: ReservationService = debugElement.injector.get(ReservationService);
        spyOn(reservationService, 'all$').and.returnValue(Observable.of([]));
        fixture.detectChanges();

        expect(debugElement.query(By.css('p')).nativeElement.textContent).toContain('Keine aktuellen Reservierungen');
    });

    it('should render reservations', () => {
        fixture.detectChanges();

        let reservations: DebugElement[] = debugElement.queryAll(By.css('.card'));
        expect(reservations).toBeDefined();
        expect(reservations.length).toEqual(MOCKED_RESERVATIONS.length);
        expect(debugElement.queryAll(By.css('jgd-simple-item-list')).length).toEqual(MOCKED_RESERVATIONS.length);
    });

    // FIXME enable test
    xit('should remove reservation', () => {
        fixture.detectChanges();

        let reservations: DebugElement[] = debugElement.queryAll(By.css('.card'));
        let deleteButton = reservations[1].query(By.css('button'));
        spyOn(reservationService, 'remove').and.callThrough();

        deleteButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(reservationService.remove).toHaveBeenCalledWith(MOCKED_RESERVATIONS[1].id);
        reservations = debugElement.queryAll(By.css('.card'));
        expect(reservations.length).toEqual(MOCKED_RESERVATIONS.length - 1);
        expect(debugElement.queryAll(By.css('jgd-simple-item-list')).length).toEqual(MOCKED_RESERVATIONS.length - 1);
    });

});
