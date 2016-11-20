import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ReservationsComponent } from './reservations.component';
import { ItemComponent } from '../items';
import { LoadingService, ReservationService, UiMessageService } from '../../services';
import { createReservationServiceFake } from '../../../testing';

describe('ReservationsComponent', () => {
    let component: ReservationsComponent;
    let fixture: ComponentFixture<ReservationsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ReservationsComponent,
                ItemComponent
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
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
