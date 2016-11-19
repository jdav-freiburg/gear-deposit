import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { EditReservationComponent } from './edit-reservation.component';
import { ReservationService } from '../../../services';
import { createReservationServiceSpy } from '../../../../test-helpers';

describe('EditReservationComponent', () => {
    let component: EditReservationComponent;
    let fixture: ComponentFixture<EditReservationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditReservationComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: <ActivatedRoute>{
                        params: Observable.from([<Params>{id: 1}])
                    }
                },
                {provide: ReservationService, useValue: createReservationServiceSpy()}
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
