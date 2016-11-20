import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { EditReservationComponent } from './edit-reservation.component';
import { ReservationService } from '../../../services';
import { ActivatedRouteStub, createReservationServiceFake, MOCKED_RESERVATIONS } from '../../../../testing';

describe('EditReservationComponent', () => {
    let activatedRoute: ActivatedRouteStub;
    let component: EditReservationComponent;
    let fixture: ComponentFixture<EditReservationComponent>;

    beforeEach(() => {
        activatedRoute = new ActivatedRouteStub();
        activatedRoute.testParams = {id: Array.from(MOCKED_RESERVATIONS)[0].id};
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditReservationComponent],
            providers: [
                {provide: ActivatedRoute, useValue: activatedRoute},
                {provide: ReservationService, useValue: createReservationServiceFake()}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditReservationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
